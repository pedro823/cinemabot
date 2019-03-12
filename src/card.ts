export const createMovieCard = ({title, rating, image, synopsis}: Movie) => ({
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
                          size: "small",
                          text: synopsis,
                          type: "TextBlock",
                          wrap: true
                      }
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
