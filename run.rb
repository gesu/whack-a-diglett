puts "Prepping build dir..."
`rm -rf build`
`mkdir build`
`cp src/css/app.css build/`
`cp src/index.html build/`
puts "Running babel..."
`node_modules/.bin/babel --presets es2015,react ./src/js --out-dir lib`
puts "Running browserify..."
`node_modules/.bin/browserify ./lib/app.js -o build/app.js`
puts "Cleaning up..."
`rm -rf lib`
puts "Done."
