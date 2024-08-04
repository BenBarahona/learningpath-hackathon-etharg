export interface IChallenge {
    readonly challengeType: string
    readonly description: string
    readonly endTime: Date
    readonly startTime: Date
    readonly title: string
    readonly balance: number
}

/* title: '',
description: '',=
deadline: '', */

export interface IOption {
    readonly option: string
    readonly isCorrect: boolean
}

export interface IQuestion {
    readonly content: string
    readonly options: IOption[]
}