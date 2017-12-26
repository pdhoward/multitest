
const schema = {
  "title": "Member Registration",
  "description": "community",
  "type": "object",
  "required": [
  ],
  "properties": {
    "avatarURL": {
      "type": "string",    
      "title": "Avatar"
    },
    "firstname": {
      "type": "string",
      "title": "First Name"
    },
    "lastname": {
      "type": "string",
      "title": "Last Name"
    },
    "email": {
      "type": "string",
      "title": "email"
    },
    "cell": {
      "type": "string",
      "title": "Cell Phone",
      "minLength": 10
    },
    "subscribe": {
      "type": "object",
      "title": "Notifications by text",
      "properties": {
        "prayeralerts": {
          "type": "boolean",
          "title": "Prayer Alerts"
        },
        "moments": {
          "type": "boolean",
          "title": "Encouraging words (sent 2 or 3X a week)"
        },
        "updates": {
          "type": "boolean",
          "title": "Weekly Updates"
        }
      }
    },
    "id": {
      "type": "string",
      "title": "Id"
    },
  }
}
const uiSchema = {
  "subscribe": {
    "prayeralerts": {
      "ui:widget": "radio"
    },
    "moments": {
      "ui:widget": "radio"
    },
    "updates": {
      "ui:widget": "radio"
    }
  }
}
const formData = {
  "subscribe": {
      "prayeralerts": true,
      "moments": true,
      "updates": true
    },
};

module.exports = {
  schema,
  uiSchema,
  formData
}
