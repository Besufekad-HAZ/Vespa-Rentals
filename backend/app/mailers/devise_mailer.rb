# frozen_string_literal: true

class DeviseMailer < Devise::Mailer
  include Devise::Mailers::Helpers

  # Use our views (app/views/devise_mailer/) instead of the gem's (devise/mailer)
  default template_path: "devise_mailer"

  def reset_password_instructions(record, token, opts = {})
    @token = token
    @resource = record
    @reset_password_url = frontend_reset_password_url(token)
    devise_mail(record, :reset_password_instructions, opts)
  end

  private

  def frontend_reset_password_url(token)
    base = ENV["FRONTEND_URL"].presence || "http://localhost:3000"
    base = base.chomp("/")
    "#{base}/reset-password?reset_password_token=#{token}"
  end
end
