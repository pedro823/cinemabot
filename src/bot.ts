// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, CardFactory } from 'botbuilder';
import { getMovies } from './showtimes'

import { createMovieCard } from './card';

import { movies } from './index';
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
        if (turnContext.activity.type === ActivityTypes.Message) {
            await this.sendMovies(turnContext);
            return
        } 
        
        if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            this.greetUser(turnContext)
            return
        }
        
        // TODO This is a card action.
    }

    private async greetUser(turnContext: TurnContext) {
        await this.sendWelcomeMessage(turnContext);
        await this.welcomedUserProperty.set(turnContext, true);
        await this.userState.saveChanges(turnContext);
    }

    private isUserWelcomed(turnContext) {
        return this.welcomedUserProperty.get(turnContext, true);
    }

    private async sendMovies(turnContext: TurnContext) {
        if (movies) {
            await turnContext.sendActivity({
                text: `I know about these movies in Sao Paulo`,
                attachments: movies.map(movie => 
                    CardFactory.adaptiveCard(createMovieCard(movie))),
            });
        }
    }

    private listShowSessions(turnContext: TurnContext, movie: Movie) {
        
    }

    private async sendWelcomeMessage(turnContext: TurnContext) {
        if (turnContext.activity.membersAdded.length !== 0) {
            for (let idx in turnContext.activity.membersAdded) {
                if (turnContext.activity.membersAdded[idx].id !== turnContext.activity.recipient.id) {
                    await turnContext.sendActivity(`Bem-vindo ao Cinema Bot! Eu posso te informar os filmes em cartaz na sua cidade e os horários das sessões... O que você gostaria de saber?`);
                }
            }
        }
    }
}
