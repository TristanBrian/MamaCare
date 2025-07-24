
import React from 'react';
import { Phone, MapPin, Heart, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Emergency: React.FC = () => {
  const { t } = useLanguage();

  const emergencyContacts = [
    {
      name: "National Emergency Hotline",
      number: "911",
      icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      description: "For life-threatening emergencies requiring immediate response."
    },
    {
      name: "Maternal Health Helpline",
      number: "1-800-123-4567",
      icon: <Heart className="h-10 w-10 text-maternal-pink-dark" />,
      description: "24/7 helpline for maternal health emergencies and advice."
    },
    {
      name: "Poison Control Center",
      number: "1-800-222-1222",
      icon: <AlertTriangle className="h-10 w-10 text-yellow-500" />,
      description: "For exposure to potentially poisonous substances."
    }
  ];

  const nearbyFacilities = [
    {
      name: "City General Hospital",
      distance: "2.3 miles",
      address: "123 Medical Center Dr, City, State",
      type: "Hospital with Maternity Ward",
      phone: "(555) 123-4567"
    },
    {
      name: "Community Health Clinic",
      distance: "0.8 miles",
      address: "456 Health Ave, City, State",
      type: "Primary Care Clinic",
      phone: "(555) 987-6543"
    },
    {
      name: "Women's Health Center",
      distance: "3.5 miles",
      address: "789 Women's Way, City, State",
      type: "Specialized Women's Health",
      phone: "(555) 456-7890"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
          <div className="flex items-start">
            <div className="mr-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-700 mb-2">
                {t('emergency')}
              </h1>
              <p className="text-red-700">
                If you are experiencing a life-threatening emergency, immediately call local emergency services or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>Important numbers for emergency situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="mr-4">
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{contact.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{contact.description}</p>
                    <p className="text-xl font-bold text-maternal-purple">{contact.number}</p>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-maternal-purple hover:bg-maternal-purple-dark"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Facilities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Nearby Healthcare Facilities</span>
            </CardTitle>
            <CardDescription>Find maternal healthcare services near you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {nearbyFacilities.map((facility, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-lg">{facility.name}</h3>
                    <span className="text-sm bg-maternal-blue-light text-maternal-blue-dark px-2 py-1 rounded-full">
                      {facility.distance}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-2">{facility.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{facility.address}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-maternal-purple font-medium">{facility.phone}</p>
                    <div className="space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-maternal-blue text-maternal-blue"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-maternal-purple hover:bg-maternal-purple-dark"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" className="text-maternal-purple">
              Load More Facilities
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
