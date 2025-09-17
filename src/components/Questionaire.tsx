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
  { id: 1, text: "Little interest or pleasure in doing things?" },
  { id: 2, text: "Feeling down, depressed, or hopeless?" },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much?" },
  { id: 4, text: "Feeling tired or having little energy?" },
  { id: 5, text: "Poor appetite or overeating?" },
  {
    id: 6,
    text: "Feeling bad about yourself—or that you are a failure or have let yourself or your family down?",
  },
  {
    id: 7,
    text: "Trouble concentrating on things, such as reading the newspaper or watching television?",
  },
  {
    id: 8,
    text: "Moving or speaking so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual?",
  },
];

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { questionnaireDone, setQuestionnaireDone } = useQuestionnaireStore();
  const [responses, setResponses] = useState<
    Record<number, { choice: 0 | 1 | 2 | 3 | null; text: string }>
  >(
    questions.reduce(
      (acc, q) => ({ ...acc, [q.id]: { choice: null, text: "" } }),
      {}
    )
  );

  const handleChoice = (id: number, value: 0 | 1 | 2 | 3) => {
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
        <span className="text-gray-600 text-center ">
          <p className="font-bold">
            Please answer the questions based on past 2 weeks experiences below.
          </p>
          <p> You can provide more details in the text box.</p>
        </span>

        <form onSubmit={handleSubmit} className="space-y-8 mt-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-3">
              <p className="font-medium text-gray-800">{q.text}</p>
              <div className="flex flex-col ">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="Not at all"
                    checked={responses[q.id].choice === 0}
                    onChange={() => handleChoice(q.id, 0)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Not at all</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="Several days"
                    checked={responses[q.id].choice === 1}
                    onChange={() => handleChoice(q.id, 1)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Several days</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="More than half the days"
                    checked={responses[q.id].choice === 2}
                    onChange={() => handleChoice(q.id, 2)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>More than half the days</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value="Nearly every day"
                    checked={responses[q.id].choice === 3}
                    onChange={() => handleChoice(q.id, 3)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span>Nearly every day</span>
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
