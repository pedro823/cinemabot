export const createMovieCard = ({title, rating, image}: Movie) => ({
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  actions: [
      {
        type: "Action.Submit",
        data: title,
        title: "Sessoes",
      }
  ],
  body: [
      {
          columns: [
              {
                  items: [
                      // {
                      //     text: "PIZZA",
                      //     type: "TextBlock"
                      // },
                      {
                          size: "extraLarge",
                          spacing: "none",
                          text: title,
                          type: "TextBlock",
                          weight: "bolder"
                      },
                      {
                          isSubtle: true,
                          spacing: "none",
                          text: `Classificao: ${isNaN(rating) ? 'live' : rating}`,
                          type: "TextBlock"
                      },
                      // {
                      //     size: "small",
                      //     text: "**Matt H. said** \"I'm compelled to give this place 5 stars due to the number of times I've chosen to eat here this past year!\"",
                      //     type: "TextBlock",
                      //     wrap: true
                      // }
                  ],
                  type: "Column",
                  width: 2
              },
              {
                  items: [
                      {
                          size: "auto",
                          type: "Image",
                          url: image
                      }
                  ],
                  type: "Column",
                  width: 1
              }
          ],
          speak: "Tom's Pie is a Pizza restaurant which is rated 9.3 by customers.",
          type: "ColumnSet"
      }
  ],  
  type: "AdaptiveCard",
  version: "1.0"
})
