# karius-demo

Live Demo: https://karius-demo.web.app

An Ionic React Typescript project with a Firebase Firestore database.

# Installation

\$ npm install

# Running

\$ npm start

# Schema

sequences:{
date,
annotations,
pathogen,
sequence,
symptoms,
viralFactor
}

# Assumptions

1. Firestore 1 MiB (1,048,576 bytes) character limit will come close to the 1m characters requirement. Otherwise, the sequence can be split into sub-collections (100 max) that can be joined together when rendered in the client.

# Questions

1. I used Firebase for expedience to go beyond mock data. If I were to build this in production, this would be a mysql db on AWS with a serverless backend behind an API gateway. All of which, can be load-balanced an replicated across regions. For the DB, the ability to create a collection of tags that can be reused for symptoms. For the UI, the ability to click on pills that list reusable records as well as free text entry of new tags.

2. My solution is already mobile friendly. I needed to spend more time making my grid size responsively. Each row has a click action that shows the values in detail, in edit mode. In mobile, I would show a detailed, mobile friendly, view with button that triggers the edit state, so mobile users can better drill down on a small device.
