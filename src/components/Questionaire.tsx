// src/pages/Questionnaire.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuestionnaireStore } from "@/store/AuthStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "Do you often feel stressed during classes?" },
  { id: 2, text: "Do you find it easy to talk to peers about your feelings?" },
  { id: 3, text: "Do you think your workload is manageable?" },
  { id: 4, text: "Do you feel supported by your campus community?" },
  { id: 5, text: "Do you regularly get enough sleep?" },
  { id: 6, text: "Do you feel comfortable reaching out for help?" },
  { id: 7, text: "Do you think mental health resources are accessible?" },
];

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaireDone, setQuestionnaireDone } = useQuestionnaireStore();
  const [responses, setResponses] = useState<
    Record<number, { choice: "yes" | "no" | null; text: string }>
  >(
    questions.reduce(
      (acc, q) => ({ ...acc, [q.id]: { choice: null, text: "" } }),
      {}
    )
  );

  const handleChoice = (id: number, value: "yes" | "no") => {
    setResponses((prev) => ({
      ...prev,
      [id]: { ...prev[id], choice: value },
    }));
  };

  const handleText = (id: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [id]: { ...prev[id], text: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form responses:", responses);
    alert("Responses submitted (check console)");
    //This part is for temporary checking of ui on answers submit. Need to be changes after backend integration
    setQuestionnaireDone(true);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Wellness Questionnaire
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please answer the questions below. You can provide more details in the
          text box.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="space-y-3">
              <p className="font-medium text-gray-800">{q.text}</p>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="yes"
                    checked={responses[q.id].choice === "yes"}
                    onChange={() => handleChoice(q.id, "yes")}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="no"
                    checked={responses[q.id].choice === "no"}
                    onChange={() => handleChoice(q.id, "no")}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>No</span>
                </label>
              </div>
              <textarea
                placeholder="Add details..."
                value={responses[q.id].text}
                onChange={(e) => handleText(q.id, e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              variant="trust"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Submit response
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;
