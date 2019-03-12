// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ActivityTypes, TurnContext, CardFactory } from 'botbuilder';
import MovieCard from './resources/movieCard.json';

import { createMovieCard } from './card';

import { movies } from './index';

export class MyBot {
    /**
     * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
     *
     * @param {TurnContext} context on turn context object.
     */
    public onTurn = async (turnContext: TurnContext) => {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
        if (turnContext.activity.type === ActivityTypes.Message) {
            await this.sendMovies(turnContext)
        } else {
            // Generic handler for all other activity types.
            await turnContext.sendActivity(`[${ turnContext.activity.type } event detected]`);
        }
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

    private movieCard() {
        return MovieCard
    }
}
