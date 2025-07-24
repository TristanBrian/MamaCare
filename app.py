from flask import Flask, jsonify, request
from flask_cors import CORS
import pickle
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load scikit-learn model
try:
    with open('models/sklearn_model.pkl', 'rb') as f:
        sklearn_model = pickle.load(f)
except Exception as e:
    print(f"Error loading scikit-learn model: {e}")
    sklearn_model = None

# Load TensorFlow model
try:
    tf_model = tf.keras.models.load_model('models/tf_model')
except Exception as e:
    print(f"Error loading TensorFlow model: {e}")
    tf_model = None

# Sample educational content data
education_content = {
    "en": [
        {"title": "Nutrition During Pregnancy", "description": "Learn about essential nutrients for a healthy pregnancy."},
        {"title": "Understanding Prenatal Tests", "description": "A comprehensive guide to prenatal screenings and tests."},
        {"title": "Preparing for Labor and Delivery", "description": "What to expect and how to prepare for your big day."}
    ],
    "sw": [
        {"title": "Lishe Wakati wa Ujauzito", "description": "Jifunze kuhusu virutubishi muhimu kwa ujauzito wenye afya."},
        {"title": "Kuelewa Vipimo vya Kabla ya Kujifungua", "description": "Mwongozo kamili wa uchunguzi na vipimo vya kabla ya kujifungua."},
        {"title": "Kujiandaa kwa Uchungu na Kujifungua", "description": "Cha kutarajia na jinsi ya kujiandaa kwa siku yako kubwa."}
    ]
}

# Sample FAQ content data
faq_content = {
    "en": [
        {
            "id": "1",
            "question": "What foods should I avoid during pregnancy?",
            "answer": "Avoid raw or undercooked meat, unpasteurized dairy, high-mercury fish, raw eggs, unwashed produce, excessive caffeine, alcohol, and processed junk food."
        },
        {
            "id": "2",
            "question": "How much weight should I gain during pregnancy?",
            "answer": "Weight gain depends on pre-pregnancy BMI. Normal weight: 25-35 pounds, underweight: 28-40 pounds, overweight: 15-25 pounds, obese: 11-20 pounds."
        }
    ],
    "sw": [
        {
            "id": "1",
            "question": "Ni vyakula gani ninapaswa kuepuka wakati wa ujauzito?",
            "answer": "Epuka nyama mbichi au isiyopikwa vizuri, maziwa yasiyochemshwa, samaki wenye zebaki nyingi, mayai mabichi, mazao yasiyooshwa, kofeini nyingi, pombe, na vyakula vya takataka vilivyosindikwa."
        },
        {
            "id": "2",
            "question": "Nipaswa kuongeza uzito kiasi gani wakati wa ujauzito?",
            "answer": "Ongezeko la uzito hutegemea BMI kabla ya ujauzito. Uzito wa kawaida: pauni 25-35, uzito mdogo: pauni 28-40, uzito zaidi: pauni 15-25, mnene: pauni 11-20."
        }
    ]
}

@app.route('/api/education/<language>', methods=['GET'])
def get_education_content(language):
    content = education_content.get(language, education_content['en'])
    return jsonify({"content": content})

@app.route('/api/faq/<language>', methods=['GET'])
def get_faq_content(language):
    content = faq_content.get(language, faq_content['en'])
    return jsonify({"content": content})

@app.route('/api/ai-assistant', methods=['POST'])
def ai_assistant():
    user_query = request.json.get('query', '').lower()

    # Simple rule-based responses for demonstration
    if 'symptom' in user_query or 'common symptoms' in user_query:
        response = "Common symptoms in the first trimester include morning sickness, fatigue, hormonal changes, and the need for prenatal vitamins."
    elif 'who are you' in user_query or 'your name' in user_query:
        response = "I am your AI Pregnancy Assistant, here to help answer your pregnancy-related questions."
    elif 'due date' in user_query:
        response = "Your due date is an estimate of when your baby will be born, typically 40 weeks from the start of your last menstrual period."
    else:
        response = f"Sorry, I don't have an answer for that yet. You asked: {user_query}"

    return jsonify({"response": response})

@app.route('/api/predict/sklearn', methods=['POST'])
def predict_sklearn():
    if sklearn_model is None:
        return jsonify({"error": "Scikit-learn model not loaded"}), 500
    data = request.json.get('data')
    try:
        input_array = np.array(data).reshape(1, -1)
        prediction = sklearn_model.predict(input_array)
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/predict/tf', methods=['POST'])
def predict_tf():
    if tf_model is None:
        return jsonify({"error": "TensorFlow model not loaded"}), 500
    data = request.json.get('data')
    try:
        input_array = np.array(data).reshape(1, -1)
        prediction = tf_model.predict(input_array)
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

from flask import abort

# Mock users for demo login
mock_users = [
    {
        "id": "1",
        "email": "admin@example.com",
        "password": "password123",
        "fullName": "Admin User",
        "role": "admin"
    },
    {
        "id": "2",
        "email": "hospital@example.com",
        "password": "password123",
        "fullName": "Nairobi Hospital",
        "role": "hospital"
    },
    {
        "id": "3",
        "email": "doctor@example.com",
        "password": "password123",
        "fullName": "Dr. Jane Doe",
        "role": "doctor"
    },
    {
        "id": "4",
        "email": "patient@example.com",
        "password": "password123",
        "fullName": "Sarah Smith",
        "role": "patient"
    }
]

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    user = next((u for u in mock_users if u['email'] == email and u['password'] == password), None)
    if user:
        user_copy = user.copy()
        user_copy.pop('password')
        return jsonify({"user": user_copy})
    else:
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
