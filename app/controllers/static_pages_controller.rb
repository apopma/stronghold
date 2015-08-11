class StaticPagesController < ApplicationController
  def home
    render :home
  end

  def root
    redirect_to home_url and return if logged_in?
    render :root
  end
end
