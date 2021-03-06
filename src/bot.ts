// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, CardFactory } from 'botbuilder';
import { getMovies } from './showtimes'

import { createMovieCard } from './card';

import { movies } from './index';

export class MyBot {

    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        if (turnContext.activity.type === ActivityTypes.Message) {
            if (movies) {
                const text = turnContext.activity.text.toLowerCase();
                const movieTitles = movies.map(movie => movie.title.toLowerCase());
                const movieIndex = movieTitles.indexOf(text)
                if (movieIndex !== -1) {
                    await this.listShowSessions(turnContext, movies[movieIndex])
                    return
                }
            }
            await this.sendMovies(turnContext);
            return
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            this.greetUser(turnContext)
            return
        }
    }

    private async greetUser(turnContext: TurnContext) {
        await this.sendWelcomeMessage(turnContext);
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

    private async listShowSessions(turnContext: TurnContext, movie: Movie) {
        let message = ''
        for (const shopping in movie.showtimes) {
            message += `${shopping}: ${movie.showtimes[shopping]}\n`
        }

        await turnContext.sendActivity({
            text: message
        })
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
