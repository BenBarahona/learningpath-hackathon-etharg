export interface IChallenge {
    readonly challengeType: string
    readonly description: string
    readonly endTime: Date
    readonly startTime: Date
    readonly title: string
    // readonly balance: number
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

export interface IPrize {
    readonly title: string
    readonly description: string
    readonly pool_type: string
    readonly user_reward: number
    readonly required_token_amount: number
    readonly total_prize: number
    readonly claimed_address: string[]
}