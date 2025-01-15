import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageCircle, Brain, Shield, Heart, Zap } from 'lucide-react';
import { useAppStore } from '@/Context/Zustand';



const SimulationResults = () => {

  

  const reportData = useAppStore((state) => state.reportData);
  // const [results, setResults] = useState('')
  console.log(reportData)
  console.log(typeof(reportData))
  // If there's no report data, render nothing
  if (reportData==="" || Object.keys(reportData).length === 0) {
    return  <div className='flex justify-center items-center h-screen' >
      <h1 className='text-5xl text-gray-400 font-semibold text-center'>NO Report Generated Yet</h1>
    </div> ;
  }

 const results = reportData

  return (
    <div className="container mx-auto p-4 mt-10 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Brain, label: 'Situation Assessment', value: results.situation_assessment_triage },
          { icon: Shield, label: 'Protocol Adherence', value: results.protocol_adherence },
          { icon: Heart, label: 'Emotional Intelligence', value: results.emotional_intelligence },
          { icon: Zap, label: 'Adaptive Thinking', value: results.adaptive_thinking },
          { icon: MessageCircle, label: 'Communication Skills', value: results.communication_skills },
        ].map((skill, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center justify-center p-4">
              <skill.icon className="w-8 h-8 mb-2 text-teal-500" />
              <h3 className="text-sm font-semibold text-center">{skill.label}</h3>
              <div className="text-2xl font-bold">{skill.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsUp className="w-6 h-6 mr-2 text-green-500" />
              Positive Aspects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{results.positive_aspects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsDown className="w-6 h-6 mr-2 text-red-500" />
              Negative Aspects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{results.negative_aspects}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-500" />
            Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{results.feedback}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationResults;

