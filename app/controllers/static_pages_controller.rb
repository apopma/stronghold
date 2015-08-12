class StaticPagesController < ApplicationController
  def root
    # Navbar and Backbone app boot from here.
    redirect_to home_url and return unless logged_in?
    render :root
  end

  def home
    # Splash page with options to sign up or sign in.
    redirect_to root_url and return if logged_in?
    render :home
  end
end
