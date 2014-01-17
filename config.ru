use Rack::Static,
    :urls => ["/main.js", "/lib", "/src", "spec", "/images", "/stylesheets", "/sounds", "/themes"],
    :root => "app"

run lambda { |env|
  [
      200,
      {
          'Content-Type'  => 'text/html',
          'Cache-Control' => 'public, max-age=86400'
      },
      File.open('app/index.html', File::RDONLY)
  ]
}