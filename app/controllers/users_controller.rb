class UsersController < ApplicationController
  before_action :require_is_current_user!, only: [:edit, :update]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:success] = ["Welcome to Stronghold, #{@user.username}."]
      redirect_to user_url(@user)
    else
      flash.now[:danger] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    @user = User.find(params[:id])
    render :edit
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      flash[:success] = ["#{@user.username} was successfully edited."]
      redirect_to user_url(@user)
    else
      flash.now[:danger] = @user.errors.full_messages
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def require_is_current_user!
    unless current_user == User.find(params[:id])
      redirect_to root_url, status: 403
    end
  end
end
