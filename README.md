# whack a diglett

[DEMO](http://gesu.github.io/whack-a-diglett/)

## Installation
```
npm install
ruby run.rb
```

Raw assets will be put into the `/build` folder. You can `cd` into it and serve it with this ruby one-liner:
```
ruby -rwebrick -e'WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd).start'
```

and then you can go check it out at `localhost:8000`

my own high score is 23 :grinning:
