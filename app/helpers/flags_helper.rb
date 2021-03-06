module FlagsHelper

  def have_recent_location?
    current_user.latitude && current_user.longitude && !!current_user.last_ping_time && current_user.last_ping_time >= 2.minutes.ago.utc
  end

  def have_current_location?
    current_user.latitude && current_user.longitude && !!current_user.last_ping_time && current_user.last_ping_time >= 1.minute.ago.utc
  end

  def markers_string(flags)
    return "" if !flags
    l_str = flags.inject("") do |str, flag|
      str +  "&markers=icon:https://goo.gl/z5p5H1|#{flag.latitude},#{flag.longitude}"
    end
    l_str[0..-2]
  end

  def center
    return params[:center] if !!params[:center] && params[:center] !=""
    return "#{current_user.latitude},#{current_user.longitude}" if !!current_user.latitude & !!current_user.longitude
    return current_user.current_city
  end

  def num_active_checkins(flag)
    flag.checkins.active.length
  end

  def num_total_checkins(flag)
    flag.checkins.length
  end

  private

  def user_checked_in?(flag)
    if current_user.checkins.active.length > 0
      current_user.checkins.active[0].flag == flag
    end
  end

  def user_near_flag?(flag)
    results = Flag.near([current_user.latitude, current_user.longitude], 0.5, :units => :mi).include?(flag)
  end

end
