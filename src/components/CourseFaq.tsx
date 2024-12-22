'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const faqData = [
  {
    question: "What topics are covered in the course?",
    answer: "The course covers a wide range of topics including foundational concepts, advanced techniques, real-world case studies, and practical projects designed to help you apply the knowledge effectively.",
    badge: "Content"
  },
  {
    question: "Is this course suitable for beginners?",
    answer: "Yes, the course is structured to accommodate learners of all levels. Beginners will find the step-by-step approach helpful, while experienced learners can skip to advanced modules as needed.",
    badge: "Difficulty"
  },
  {
    question: "Are there any prerequisites for this course?",
    answer: "While no prior knowledge is mandatory, a basic understanding of the subject or related tools will help you grasp concepts faster. Any specific prerequisites will be mentioned in the course description.",
    badge: "Requirements"
  },
  {
    question: "Do I get a certificate after completing the course?",
    answer: "Yes, you will receive a certificate of completion after finishing all modules and assessments.",
    badge: "Certification"
  },
  {
    question: "What is the duration of the course?",
    answer: "The course is self-paced, but on average, learners complete it in 4-6 weeks by dedicating 4-5 hours per week. You can adjust the pace according to your schedule.",
    badge: "Duration"
  },
  {
    question: "How can I get support if I have questions?",
    answer: "You can ask questions in the discussion forums or join live Q&A sessions with the instructor. Additionally, our support team is available via email for any technical assistance.",
    badge: "Support"
  }
]

export default function ModernFaq() {
  const [openItem, setOpenItem] = useState<string>()

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-7xl shadow-md rounded-lg overflow-hidden border-none">
        <CardHeader className="text-center relative pb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          <CardTitle className="text-4xl font-bold text-primary relative z-10">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="w-full"
          >
            {faqData.map((item, index) => (
              <AccordionItem
                key={`item-${index + 1}`}
                value={`item-${index + 1}`}
                className="border-b border-gray-200 py-4 transition-colors duration-200"
              >
                <AccordionTrigger className="flex items-center justify-between w-full text-left hover:no-underline group">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="hidden sm:inline-flex">
                      {item.badge}
                    </Badge>
                    <span className="text-lg font-semibold">{item.question}</span>
                  </div>
                  {/* Single Chevron */}
                  {/* <div className="transform transition-transform duration-200 group-data-[state=open]:rotate-180">
                    ▼
                  </div> */}
                </AccordionTrigger>
                <AccordionContent className="mt-2 dark:text-gray-300 pl-4 border-l-2 border-primary/20">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
