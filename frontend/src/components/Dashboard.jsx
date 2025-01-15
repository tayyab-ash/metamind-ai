import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DispatchContext } from "@/Context/ContextAPI";
import { useAppStore } from "@/Context/Zustand";
import Contributors from "./Contributors";
import larenda from "@/assets/larenda.jpg";
import medihack from "@/assets/medihack.jpg";

function Dashboard() {
  const navigate = useNavigate();
  // const {isAuthenticated,setIsAuthenticated } = useContext(DispatchContext);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAppStore((state) => state.setIsAuthenticated);
  const sponsors = [
    { name: "MediHack", logo: medihack },
    { name: "larenda", logo: larenda },
  ];

  useEffect(() => {
    isAuthenticated ? navigate("/") : navigate("/login");
  }, []);
  return (
    <div className="container mx-auto mt-10 space-y-10">
      <h1 className="text-3xl font-bold text-center text-gray-200">
        Welcome, Dispatcher
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Practice emergency dispatch scenarios.</p>
            <Button asChild className="mt-4">
              <Link to="/simulation">Start Simulation</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review and analyze your performance.</p>
            <Button asChild className="mt-4">
              <Link to="/feedback">View Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Completed Simulations: 10</p>
          <p>Average Adherence: 85%</p>
          <p>Areas for Improvement: Response Time, Protocol Adherence</p>
        </CardContent>
      </Card>
      <Contributors />
      <div className="p-4 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Our Contributors
        </h2>
        <div className="sponsor-logos flex flex-wrap justify-center gap-32">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-xl text-slate-200"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-lg shadow-lg hover:scale-105 transition-transform"
              />

              <p className="mb-20 ">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
