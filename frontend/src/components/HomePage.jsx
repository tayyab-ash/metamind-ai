import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="space-y-10 container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Emergency Dispatcher Training</h1>
      <Card>
        <CardHeader>
          <CardTitle>About Our Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Our Emergency Dispatcher Training platform is designed to help dispatchers improve their skills and response times in critical situations. Through realistic simulations and comprehensive feedback, we aim to enhance the quality of emergency services.
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Practice with realistic emergency scenarios</li>
            <li>Receive detailed feedback on your performance</li>
            <li>Track your progress over time</li>
            <li>Access comprehensive reporting and analytics</li>
          </ul>
          <Button asChild>
            <Link to="/simulation">Start Training Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;

