"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const monthMap = new Map([
	[1, "january"],
	[2, "february"],
	[3, "march"],
	[4, "april"],
	[5, "may"],
	[6, "june"],
	[7, "july"],
	[8, "august"],
	[9, "september"],
	[10, "october"],
	[11, "november"],
	[12, "december"],
])

const daysInMonthMap = new Map([
	["january", 31],
	["february", 28],
	["march", 31],
	["april", 30],
	["may", 31],
	["june", 30],
	["july", 31],
	["august", 31],
	["september", 30],
	["october", 31],
	["november", 30],
	["december", 31],
])

export default function DatePicker() {
	const [guessedMonth, setGuessedMonth] = useState<number>(6)
	const [guessedDay, setGuessedDay] = useState<number>(15)
	const [guessedYear, setGuessedYear] = useState<number>(2024)
	const [currentStep, setCurrentStep] = useState<"month" | "day" | "year">(
		"month",
	)
	const [minMonth, setMinMonth] = useState(1)
	const [maxMonth, setMaxMonth] = useState(12)
	const [minDay, setMinDay] = useState(1)
	const [maxDay, setMaxDay] = useState(31)
	const [minYear, setMinYear] = useState(1900)
	const [maxYear, setMaxYear] = useState(2100)

	const guessedMonthString =
		(monthMap.get(guessedMonth) ?? "").charAt(0).toUpperCase() +
		(monthMap.get(guessedMonth) ?? "").slice(1)

	const currentDate = {
		month: guessedMonthString,
		day: guessedDay,
		year: guessedYear,
	}

	function handleMonthGuess(guess: string) {
		if (guess === "earlier") {
			setMaxMonth(guessedMonth - 1)
			setGuessedMonth(Math.floor((minMonth + guessedMonth - 1) / 2))
		} else if (guess === "correct") {
			setMaxDay(daysInMonthMap.get(monthMap.get(guessedMonth) ?? "") ?? 31)
			setCurrentStep("day")
		} else if (guess === "later") {
			setMinMonth(guessedMonth + 1)
			setGuessedMonth(Math.ceil((guessedMonth + 1 + maxMonth) / 2))
		}
	}

	function handleDayGuess(guess: string) {
		const daysInMonth =
			daysInMonthMap.get(monthMap.get(guessedMonth) ?? "") ?? 31
		if (guess === "earlier") {
			setMaxDay(guessedDay - 1)
			setGuessedDay(Math.floor((minDay + guessedDay - 1) / 2))
		} else if (guess === "correct") {
			setCurrentStep("year")
		} else if (guess === "later") {
			setMinDay(guessedDay + 1)
			setGuessedDay(
				Math.min(Math.ceil((guessedDay + 1 + maxDay) / 2), daysInMonth),
			)
		}
	}

	function handleYearGuess(guess: string) {
		if (guess === "earlier") {
			setMaxYear(guessedYear - 1)
			setGuessedYear(Math.floor((minYear + guessedYear - 1) / 2))
			setCurrentStep("month")
		} else if (guess === "correct") {
			// The year is correct, you might want to add some final action here
		} else if (guess === "later") {
			setMinYear(guessedYear + 1)
			setGuessedYear(Math.ceil((guessedYear + 1 + maxYear) / 2))
			setCurrentStep("month")
		}
	}

	function handleGuess(guess: string) {
		if (currentStep === "month") {
			handleMonthGuess(guess)
			if (guess === "correct") setCurrentStep("day")
		} else if (currentStep === "day") {
			handleDayGuess(guess)
			if (guess === "correct") setCurrentStep("year")
		} else if (currentStep === "year") {
			handleYearGuess(guess)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
			<Card className="w-full max-w-md mx-auto bg-white shadow-lg">
				<CardHeader className="bg-purple-900 text-white rounded-t-lg">
					<CardTitle className="text-center text-2xl font-bold">
						Silly Date Picker
					</CardTitle>
				</CardHeader>
				<CardContent className="p-6 bg-purple-50">
					<div className="text-3xl font-bold text-center mb-6 text-purple-800">
						{`${currentDate.month} ${currentDate.day}, ${currentDate.year}`}
					</div>
					<div className="space-y-4">
						<div className="text-lg text-center text-purple-700">
							<span className="font-semibold">
								Select the correct {currentStep}:
							</span>
							<br />
							<span className="text-2xl font-bold text-purple-900">
								{currentStep === "month" && `Is it ${currentDate.month}?`}
								{currentStep === "day" && `Is it ${currentDate.day}?`}
								{currentStep === "year" && `Is it ${currentDate.year}?`}
							</span>
						</div>
						<div className="flex justify-center space-x-4">
							<Button
								variant="outline"
								onClick={() => handleGuess("earlier")}
								className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 hover:text-purple-800 transition-colors"
							>
								Earlier
							</Button>
							<Button
								variant="default"
								onClick={() => handleGuess("correct")}
								className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
							>
								Correct
							</Button>
							<Button
								variant="outline"
								onClick={() => handleGuess("later")}
								className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 hover:text-purple-800 transition-colors"
							>
								Later
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
