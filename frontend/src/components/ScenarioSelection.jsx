import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const scenarios = [
  { icon: "🚑", text: "Medical Emergency" },
  { icon: "🚒", text: "Fire Incident" },
  { icon: "🚗", text: "Traffic Accident" },
  { icon: "🆘", text: "General Emergency" },
];

export function ScenarioSelection({ onSelect }) {
  return (
    <div className="flex justify-center mt-20">
      <div className="simulationSelector flex flex-col gap-10  items-start">
        <h2 className="text-xl font-semibold text-gray-100">
          Select Simulation Type
        </h2>
        <div className="flex flex-wrap gap-4">
          {scenarios.map((scenario, index) => (
            <Card
              key={index}
              className=" p-1 w-32 md:w-52 leading-tight md:p-4 cursor-pointer border-3 hover:text-white hover:border-blue-300 hover:bg-white/30 transition-all ease-in"
              onClick={() => onSelect(scenario.text)}
            >
              <CardContent className="text-center">
                <div className="text-4xl">{scenario.icon}</div>
                <h2 className="font-bold mt-2">{scenario.text}</h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

