// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, CardFactory } from 'botbuilder';
import MovieCard from './resources/movieCard.json';

const WELCOMED_USER = "userWelcomed"

export class MyBot {

    private welcomedUserProperty: any
    private userState: any

    constructor(userState) {
        this.welcomedUserProperty = userState.createProperty(WELCOMED_USER);
        this.userState = userState
    }

    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            if (this.isUserWelcomed(turnContext)) {
                await turnContext.sendActivity(`Olá! Eu posso te informar os filmes em cartaz na sua cidade e os horários das sessões... O que você gostaria de saber?`);    
            } else {
                await turnContext.sendActivity({
                    text: 'Here is an Adaptive Card:',
                    attachments: [CardFactory.adaptiveCard(this.movieCard())]
                });
            } 
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
    }

    private isUserWelcomed(turnContext) {
        return this.welcomedUserProperty.get(turnContext, false);
    }

    private movieCard() {
        return MovieCard
    }
}
