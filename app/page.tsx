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

const years = Array.from({ length: 201 }, (_, i) => i + 1900)

interface DateInterface {
	month: number
	day: number
	year: number
}

export default function DatePicker() {
	const [guessedMonth, setGuessedMonth] = useState<number>(6)
	const [guessedDay, setGuessedDay] = useState<number>(15)
	const [guessedYear, setGuessedYear] = useState<number>(2024)
	const [currentStep, setCurrentStep] = useState<"month" | "day" | "year">(
		"month",
	)
	const [minMonth, setMinMonth] = useState(1)
	const [maxMonth, setMaxMonth] = useState(12)

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
			setCurrentStep("day")
		} else if (guess === "later") {
			setMinMonth(guessedMonth + 1)
			setGuessedMonth(Math.ceil((guessedMonth + 1 + maxMonth) / 2))
		}
	}

	function handleDayGuess(guess: string) {
		if (guess === "earlier") {
			setGuessedDay(guessedDay - 1)
		} else if (guess === "correct") {
			setGuessedDay(guessedDay)
		} else if (guess === "later") {
			setGuessedDay(guessedDay + 1)
		}
	}

	function handleYearGuess(guess: string) {
		if (guess === "earlier") {
			setGuessedYear(guessedYear - 1)
		} else if (guess === "correct") {
			setGuessedYear(guessedYear)
		} else if (guess === "later") {
			setGuessedYear(guessedYear + 1)
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
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle className="text-center">Improved Date Picker</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-center mb-4">
					{`${currentDate.month} ${currentDate.day}, ${currentDate.year}`}
				</div>
				<div className="text-xl font-semibold text-center mb-4">
					Select the correct {currentStep}:
				</div>
				<div className="text-lg text-center mb-4">
					{currentStep === "month" && `Is it ${currentDate.month}?`}
					{currentStep === "day" && `Is it ${currentDate.day}?`}
					{currentStep === "year" && `Is it ${currentDate.year}?`}
				</div>
				<div className="flex justify-center space-x-4">
					<Button variant="outline" onClick={() => handleGuess("earlier")}>
						Earlier
					</Button>
					<Button variant="default" onClick={() => handleGuess("correct")}>
						Correct
					</Button>
					<Button variant="outline" onClick={() => handleGuess("later")}>
						Later
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
