use Rack::Static,
    :urls => ["/images", "/javascripts", "/stylesheets", "/sounds", "/templates"],
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