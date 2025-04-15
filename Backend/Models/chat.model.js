import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  history:[
    {
      role:{
        type: String,
        enum: ["user", "model"],
        required: true,
      },
      parts:[
        {
          text:{
            type: String,
            required: true,
          },
          image:{
            type: String,
            default: null,
          },
        }
      ]
    }
  ]

},{timestamps:true});

export default mongoose.model("Chat", chatSchema);