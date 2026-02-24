# Set FRONTEND_URL in production (e.g. https://vespa-rentals.vercel.app). Dev defaults to *.
frontend_origins = ENV.fetch('FRONTEND_URL', '*').split(',').map(&:strip).reject(&:empty?)
frontend_origins = ['*'] if frontend_origins.empty?

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*frontend_origins)

    resource '*',
      headers: :any,
      expose: %w[access-token expiry token-type Authorization],
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: frontend_origins.include?('*') ? false : true
  end
end
