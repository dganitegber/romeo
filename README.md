# romeo-fe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Some notes and general thoughts
*I chose vue with vuetify since those are the stacks I have most experience with. Given some learning time, I have no doubt this can be written easily using react.
 
*I have tried to create a lazy scrolling mechanism, however I didn't figure out a way to get the offset feature to work on the html request.
If those are enabled, I'd like to know how to get it to work (there are about 600 entries but loading all at once will be too slow
and in addition i believe you have to set a limit anyway? Let's talk about it).
 
*Regarding TS use, I have no doubt the typing can be stronger. I'm still in the process of learning TS
and in addition had some issues as most of the times I was asked to change the "any", I tried to replace it
with an object and the linter informed me that working with objects is not recommended... so, I assume this could be done better as well.
 
*I really wanted to implement a sorting by status (online, date etc.) but this is something which should also be enabled in the backend if I'm not mistaken. That would have been my next step anyway, together with beautifying the main profile card (I do hope you clicked on each card to open a "fuller" profile. Well, theoretically fuller anyway).
 
In conclusion, this was a fun task, I enjoyed doing it, I have built similar apps both in my bootcamp and in my current position.
It might be a little bit more time consuming, however regarding programming level, I'm of the opinion it can be considered as a task for a junior position. I hope ;)