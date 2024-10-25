"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const monthMap = new Map([
	[1, "January"],
	[2, "February"],
	[3, "March"],
	[4, "April"],
	[5, "May"],
	[6, "June"],
	[7, "July"],
	[8, "August"],
	[9, "September"],
	[10, "October"],
	[11, "November"],
	[12, "December"],
])

const daysInMonthMap = new Map([
	["January", 31],
	["February", 28],
	["March", 31],
	["April", 30],
	["May", 31],
	["June", 30],
	["July", 31],
	["August", 31],
	["September", 30],
	["October", 31],
	["November", 30],
	["December", 31],
])

function getOrdinalDay(day: number): string {
	const suffixes = ["th", "st", "nd", "rd"]
	const relevantDigits = day < 30 ? day % 20 : day % 30
	const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0]
	return `${day}${suffix}`
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
	const [minDay, setMinDay] = useState(1)
	const [maxDay, setMaxDay] = useState(31)
	const [minYear, setMinYear] = useState(1900)
	const [maxYear, setMaxYear] = useState(2100)
	const [isDateSelected, setIsDateSelected] = useState(false)

	const guessedMonthString = monthMap.get(guessedMonth) ?? ""

	const currentDate = {
		month: guessedMonthString,
		day: getOrdinalDay(guessedDay),
		year: guessedYear,
	}

	function handleMonthGuess(guess: string) {
		if (guess === "earlier") {
			setMaxMonth(guessedMonth - 1)
			if (maxMonth - 1 === minMonth) {
				setGuessedMonth(minMonth)
				setCurrentStep("day")
			} else {
				setGuessedMonth(Math.floor((minMonth + guessedMonth - 1) / 2))
			}
		} else if (guess === "correct") {
			setCurrentStep("day")
		} else if (guess === "later") {
			setMinMonth(guessedMonth + 1)
			if (minMonth + 1 === maxMonth) {
				setGuessedMonth(maxMonth)
				setCurrentStep("day")
			} else {
				setGuessedMonth(Math.ceil((guessedMonth + 1 + maxMonth) / 2))
			}
		}
	}

	function handleDayGuess(guess: string) {
		const daysInMonth =
			daysInMonthMap.get(monthMap.get(guessedMonth) ?? "") ?? 31

		if (guess === "earlier") {
			setMaxDay(guessedDay - 1)
			if (guessedDay - 1 === minDay) {
				setGuessedDay(minDay)
				setCurrentStep("year")
			} else {
				setGuessedDay(Math.floor((minDay + guessedDay - 1) / 2))
			}
		} else if (guess === "correct") {
			setCurrentStep("year")
		} else if (guess === "later") {
			setMinDay(guessedDay + 1)
			if (guessedDay + 1 === maxDay) {
				setGuessedDay(maxDay)
				setCurrentStep("year")
			} else {
				setGuessedDay(
					Math.min(Math.ceil((guessedDay + 1 + maxDay) / 2), daysInMonth),
				)
			}
		}
	}

	function handleYearGuess(guess: string) {
		if (guess === "earlier") {
			setMaxYear(guessedYear - 1)
			if (guessedYear - 1 === minYear) {
				setGuessedYear(minYear)
				setIsDateSelected(true)
			} else {
				setGuessedYear(Math.floor((minYear + guessedYear - 1) / 2))
			}
		} else if (guess === "correct") {
			setIsDateSelected(true)
		} else if (guess === "later") {
			setMinYear(guessedYear + 1)
			if (guessedYear + 1 === maxYear) {
				setGuessedYear(maxYear)
				setIsDateSelected(true)
			} else {
				setGuessedYear(Math.ceil((guessedYear + 1 + maxYear) / 2))
			}
		}
	}

	function handleGuess(guess: string) {
		if (currentStep === "month") {
			handleMonthGuess(guess)
		} else if (currentStep === "day") {
			handleDayGuess(guess)
		} else if (currentStep === "year") {
			handleYearGuess(guess)
		}
	}

	function resetDatePicker() {
		setGuessedMonth(6)
		setGuessedDay(15)
		setGuessedYear(2024)
		setCurrentStep("month")
		setMinMonth(1)
		setMaxMonth(12)
		setMinDay(1)
		setMaxDay(31)
		setMinYear(1900)
		setMaxYear(2100)
		setIsDateSelected(false)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
			<Card className="w-full max-w-md mx-auto bg-white shadow-lg">
				<CardHeader className="bg-purple-600 text-white rounded-t-lg">
					<CardTitle className="text-center text-2xl font-bold">
						Standard Date Picker
					</CardTitle>
				</CardHeader>
				<CardContent className="p-6">
					{!isDateSelected ? (
						<div className="space-y-6">
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
										{currentStep === "month" && `${currentDate.month}?`}
										{currentStep === "day" && `${currentDate.day}?`}
										{currentStep === "year" && `${currentDate.year}?`}
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
						</div>
					) : (
						<div className="text-center space-y-6">
							<h2 className="text-2xl font-bold text-purple-800">
								You've Selected
							</h2>
							<div className="text-4xl font-bold text-purple-900">
								{`${currentDate.month} ${currentDate.day}, ${currentDate.year}`}
							</div>
							<Button
								onClick={resetDatePicker}
								className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
							>
								Pick Another Date
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
