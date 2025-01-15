import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function FeedbackAnalysis() {
  // This would typically come from an API or state management
  const feedbackData = {
    adherenceIssues: [
      { id: 1, issue: "Missed critical information gathering", severity: "high" },
      { id: 2, issue: "Incorrect prioritization of emergency", severity: "medium" },
    ],
    missedSteps: [
      { id: 1, step: "Failed to ask for caller's name", severity: "low" },
      { id: 2, step: "Didn't provide pre-arrival instructions", severity: "high" },
    ],
  };

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Feedback Analysis</h1>
      <Card>
        <CardHeader>
          <CardTitle>Protocol Adherence Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedbackData.adherenceIssues.map((issue) => (
              <li key={issue.id} className="flex items-center space-x-2">
                <Badge variant={getSeverityVariant(issue.severity)}>
                  {issue.severity}
                </Badge>
                <span>{issue.issue}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Missed Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedbackData.missedSteps.map((step) => (
              <li key={step.id} className="flex items-center space-x-2">
                <Badge variant={getSeverityVariant(step.severity)}>
                  {step.severity}
                </Badge>
                <span>{step.step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeedbackAnalysis;

