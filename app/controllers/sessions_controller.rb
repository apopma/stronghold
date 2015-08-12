class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params)

    if @user
      login!(@user)
      flash[:success] = ["Welcome back, #{@user.username}."]
      redirect_to root_url
    else
      flash.now[:warning] = ["Sorry, we didn't recognize your credentials."]
      @user = User.new
      render :new
    end
  end

  def destroy
    logout!
    flash[:info] = ["You've been logged out."]
    render json: {} # AJAX performs the redirect over in navbar.js
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
