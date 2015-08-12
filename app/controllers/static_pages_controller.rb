class StaticPagesController < ApplicationController
  def home
    redirect_to root_url and return unless logged_in?
    render :home
  end

  def root
    redirect_to home_url and return if logged_in?
    render :root
  end
end
