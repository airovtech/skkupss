package net.smartworks.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;
import com.ibm.icu.util.ChineseCalendar;

public class LocalDate extends Date{

	public final static int ONE_SECOND = 1000;
	public final static	int ONE_MINUTE = 60*ONE_SECOND;
	public final static int ONE_HOUR = 60*ONE_MINUTE;
	public final static long ONE_DAY = 24*ONE_HOUR;
	public final static long ONE_WEEK = 7*ONE_DAY;
	public final static long ONE_YEAR = 365*ONE_DAY;
	
	public final static String TIMEZONE_SEOUL = "Asia/Seoul";
	public final static String TIMEZONE_LOS_ANGELES = "America/Los_Angeles";

	private static final long serialVersionUID = 1L;
	public TimeZone timeZone = TimeZone.getDefault();
	private TimeZone hostTimeZone = TimeZone.getDefault();
	private Locale locale = new Locale(LocaleInfo.LOCALE_DEFAULT);
	private long localNow = System.currentTimeMillis();
	private int firstDayOfWeek = Calendar.MONDAY;
	public LocalDate(){
		super();
		super.setTime(super.getTime()-hostTimeZone.getRawOffset());
	}
	public LocalDate(long GMTDate){
		super(GMTDate);
	}
	
	public LocalDate(long GMTDate, String timeZone, String locale){
		super(GMTDate);
		if(isValidTimeZone(timeZone))
			this.setTimeZone(timeZone);
		if(LocaleInfo.isSupportingLocale(locale))
			this.setLocale(locale);
	}
	
	public String getLocale(){
		return locale.toString();
	}
	public void setLocale(String locale){
		if(LocaleInfo.isSupportingLocale(locale)){
			this.locale = new Locale(locale);
		}
	}
	public long getLocalDate(){
		return super.getTime() + this.timeZone.getRawOffset();
	}

	public long getGMTDate(){
		return super.getTime();
	}
	public void setGMTDate(long GMTDate){
		super.setTime(GMTDate);
	}
	public String getTimeZone(){
		if(timeZone == null)
			return null;
		return timeZone.getID();
	}
	public void setTimeZone(String timeZone){
		if(LocalDate.isValidTimeZone(timeZone)){
			this.timeZone = TimeZone.getTimeZone(timeZone);
		}
	}	
	public int getFirstDayOfWeek() {
		return firstDayOfWeek;
	}
	public void setFirstDayOfWeek(int firstDayOfWeek) {
		this.firstDayOfWeek = firstDayOfWeek;
	}
	
	public int getDateOnly(){
		Calendar cal = Calendar.getInstance(this.timeZone, this.locale);
		cal.setTime(new Date(this.getLocalDate()));
		return cal.get(Calendar.DATE);
	}

	public int getMonth(){
		Calendar cal = Calendar.getInstance(this.timeZone, this.locale);
		cal.setTime(new Date(this.getLocalDate()));
		return cal.get(Calendar.MONTH);
	}

	public int getYear(){
		Calendar cal = Calendar.getInstance(this.timeZone, this.locale);
		cal.setTime(new Date(this.getLocalDate()));
		return cal.get(Calendar.YEAR);		
	}
	
	public int getWeekOfMonth(){
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(7);
		return cal.get(Calendar.WEEK_OF_MONTH);		
	}
	public int getWeekOfMonth(int minimalDaysInFirstWeek){
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(minimalDaysInFirstWeek);
		return cal.get(Calendar.WEEK_OF_MONTH);		
	}
	public int getWeekOfYear(){
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(7);
		return cal.get(Calendar.WEEK_OF_YEAR);		
	}
	
	public int getDayOfWeek(){
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(7);
		return cal.get(Calendar.DAY_OF_WEEK);		
	}
	
	public int getWeeksOfMonth(int minimalDaysInFirstWeek){
	    Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(minimalDaysInFirstWeek);

	    int ndays = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	    int weeks[] = new int[ndays];
	    for (int i = 0; i < ndays; i++)
	    {
	        weeks[i] = cal.get(Calendar.WEEK_OF_MONTH);
	        cal.add(Calendar.DATE, 1);
	    }
	    return weeks[ndays-1];
	}
	
	public int getWeeksOfMonth(){
	    Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(7);

	    int ndays = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	    int weeks[] = new int[ndays];
	    for (int i = 0; i < ndays; i++)
	    {
	        weeks[i] = cal.get(Calendar.WEEK_OF_MONTH);
	        cal.add(Calendar.DATE, 1);
	    }
	    return weeks[ndays-1];
	}
	
	public int getDaysOfMonth(int minimalDaysInFirstWeek){
	    Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(minimalDaysInFirstWeek);

	    return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	
	public int getDaysOfMonth(){
	    Calendar cal = Calendar.getInstance();
		cal.setTime(new Date(this.getLocalDate()));
		cal.setFirstDayOfWeek(this.firstDayOfWeek);
		cal.setMinimalDaysInFirstWeek(7);

	    return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	
	public String toLocalString(){
		if(isToday()){
			return (new SimpleDateFormat("HH:mm")).format(getLocalTime());
		}else if(isThisYear()){
			return (new SimpleDateFormat("MM.dd HH:mm")).format(getLocalTime());
		}
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm")).format(getLocalTime());			
	}

	public String toString(){
		if(isToday()){
			return (new SimpleDateFormat("HH:mm")).format(getTime());
		}else if(isThisYear()){
			return (new SimpleDateFormat("MM.dd HH:mm")).format(getTime());
		}
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm")).format(getTime());			
	}

	public String toLocalDateString(){
		return DateFormat.getDateInstance(DateFormat.FULL, this.locale).format(getLocalTime());
	}
	
	public String toLocalMonthFullString(){
		return (new SimpleDateFormat("yyyy MMMM", this.locale)).format(getLocalTime());		
	}
	
	public String toLocalYearString(){
		return (new SimpleDateFormat("yyyy", this.locale)).format(getLocalTime());		
	}
	
	public String toLocalMonthOnlyString(){
		return (new SimpleDateFormat("MM", this.locale)).format(getLocalTime());		
	}
	
	public String toLocalDateOnlyString(){
		return (new SimpleDateFormat("dd", this.locale)).format(getLocalTime());		
	}
	
	public String toLocalMonthShortString(){
		return (new SimpleDateFormat("MMM", this.locale)).format(getLocalTime());		
	}
	
	public String toLocalDateShortString(){
		return (new SimpleDateFormat("MM.dd E", this.locale)).format(getLocalTime());
	}

	public String toLocalDateSimpleString(){
		return (new SimpleDateFormat("yyyy.MM.dd", this.locale)).format(getLocalTime());
	}

	public String toDateSimpleString(){
		return (new SimpleDateFormat("yyyy.MM.dd", this.locale)).format(getTime());
	}

	public String toLocalDateSimple2String(){
		return (new SimpleDateFormat("yyyy-MM-dd", this.locale)).format(getLocalTime());
	}

	public String toLocalDateLongString(){
		return (new SimpleDateFormat("yyyy.MM.dd E", this.locale)).format(getLocalTime());
	}

	public String toLocalMonthString(){
		return (new SimpleDateFormat("yyyy.MM", this.locale)).format(getLocalTime());
	}

	public String toLocalDateTimeSimpleString(){
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm", this.locale)).format(getLocalTime());
	}

	public String toLocalDateTimeSimpleString2(){
		return (new SimpleDateFormat("yyyy-MM-dd HH:mm", this.locale)).format(getLocalTime());
	}

	public String toDateTimeSimpleString(){
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm", this.locale)).format(getTime());
	}

	public String toLocalDateValue(){
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm:ss.SSS", this.locale)).format(getLocalTime());
	}

	public String toDateValue(){
		return (new SimpleDateFormat("yyyy.MM.dd HH:mm:ss.SSS", this.locale)).format(getTime());
	}

	public String toLocalDateString2(){
		return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS", this.locale)).format(getLocalTime());
	}

	public String toLocalDateTString(){
		String result = (new SimpleDateFormat("yyyy-MM-dd HHmmss", this.locale)).format(getLocalTime());
		if(result!=null) result = result.replace(" ", "T");
		return result;
	}

	public String toLocalTimeString2(){
		return (new SimpleDateFormat("HH:mm", this.locale)).format(getLocalTime());
	}

	public String toLocalDayString(){
		return (new SimpleDateFormat("E", this.locale)).format(getLocalTime());
	}

	public String toGMTDateString(){
		return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")).format(getGMTDate());
	}
	public String toGMTDateString2(){
		return (new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS")).format(getGMTDate());
	}
	public String toGMTSimpleDateString(){
		return (new SimpleDateFormat("yyyy-MM-dd")).format(getGMTDate());
	}

	public String toGMTSimpleDateString2(){
		return (new SimpleDateFormat("yyyy.MM.dd")).format(getGMTDate());
	}

	public String toGMTSimpleDateString3(){
		return (new SimpleDateFormat("yyyyMMdd")).format(getGMTDate());
	}

	public String toLocalDateSimpleDateString3(){
		return (new SimpleDateFormat("yyyyMMdd")).format(getLocalTime());
	}

	public String toGMTTimeString(){
		return (new SimpleDateFormat("HH:mm:ss")).format(getGMTDate());
	}

	public String toGMTTimeString2(){
		return (new SimpleDateFormat("HH:mm")).format(getGMTDate());
	}

	public String toLocalTimeString(){
		return DateFormat.getTimeInstance(DateFormat.MEDIUM, this.locale).format(getLocalTime());
	}

	public String toLocalTimeSimpleString(){
		return (new SimpleDateFormat("HH:mm:ss")).format(getLocalTime());
	}

	public String toLocalTimeShortString(){
		return (new SimpleDateFormat("HH:mm")).format(getLocalTime());
	}

	public String toTimeShortString(){
		return (new SimpleDateFormat("HH:mm")).format(getTime());
	}

	public void plusToGMTTime(long timeValue){
		this.setTime(this.getTime() + timeValue);
	}

	public boolean isSameDate(LocalDate when){
		if((this).toLocalDateSimple2String().equals(when.toLocalDateSimple2String())) return true;
//		if( getLocalDateOnly(this).getTime() == getLocalDateOnly(when).getTime()) return true;
		return false;
	}

	public boolean isBeforeDate(LocalDate when){
		if( getLocalDateOnly(this).getTime() > getLocalDateOnly(when).getTime()) return true;
		
		return false;
	}

	public boolean isAfterDate(LocalDate when){
		if(getLocalDateOnly(this).getTime() < getLocalDateOnly(when).getTime()) return true;
		return false;
	}
	
	public static long getDiffDate(Date fromDate, Date toDate){
		if(fromDate==null || toDate==null) return 0;
		return (toDate.getTime() - fromDate.getTime())/LocalDate.ONE_DAY;		
	}
	
	public long getLocalTime(){
		if(this.timeZone == null){
			return super.getTime() + TimeZone.getDefault().getRawOffset();
		}else{
			return super.getTime() + this.timeZone.getRawOffset();
		}
	}
	
	public boolean isNew(){
		if(this.getTime() >= ((new LocalDate()).getTime() - 2*LocalDate.ONE_DAY))
			return true;
		return false;		
	}
	
	public static boolean isValidTimeZone(String timeZone){
		String[] zoneIds = TimeZone.getAvailableIDs();
		for(String str : zoneIds)
			if(str.equals(timeZone)) return true;
		return false;
		
	}	
	
	public static String convertTimeToString(long time){
		return (new SimpleDateFormat("HH:mm")).format(time - TimeZone.getDefault().getRawOffset());
	}
	public static Date convertLocalToGMT(long localDate, String timeZone){
		if(isValidTimeZone(timeZone))
			return new Date(localDate - TimeZone.getTimeZone(timeZone).getRawOffset());
		return new Date(localDate);
	}
	public static Date convertGMTToLocal(long GMTDate, String timeZone){
		if(isValidTimeZone(timeZone))
			return new Date(GMTDate + TimeZone.getTimeZone(timeZone).getRawOffset());
		return new Date(GMTDate);
	}

	public static Date convertStringToDate(String yyyyMMddHHmm) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmm) || yyyyMMddHHmm.length()!=12) return null;
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmm");
		return df.parse(yyyyMMddHHmm);					
	}

	public static Date convertStringToDateTime(String yyyyMMddHHmm) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmm) || yyyyMMddHHmm.length()!=14) return null;
		DateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
		return df.parse(yyyyMMddHHmm);					
	}

	public static Date convertTimeStringToDate(String HHmm) throws Exception{
		if(SmartUtil.isBlankObject(HHmm)) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.parse("1900-01-01 " + HHmm + ":00");
	}

	public static LocalDate convertLocalStringToLocalDate(String yyyyMMddHHmmssSSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSSS) || yyyyMMddHHmmssSSS.length() < 21) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		return new LocalDate((df.parse(yyyyMMddHHmmssSSS)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalDateTimeStringToLocalDate(String yyyyMMddHHmm) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmm) || yyyyMMddHHmm.length()!=16) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd HH:mm");
		return new LocalDate((df.parse(yyyyMMddHHmm)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalDateStringToLocalDate1(String yyyyMMdd) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMdd) || yyyyMMdd.length()!=8) return null;
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		return new LocalDate((df.parse(yyyyMMdd)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalDateStringToLocalDate2(String yyyyMMdd) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMdd) || yyyyMMdd.length()!=10) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return new LocalDate((df.parse(yyyyMMdd)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalDateStringToLocalDate(String yyyyMMdd) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMdd) || yyyyMMdd.length()!=10) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd");
		return new LocalDate((df.parse(yyyyMMdd)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalYearStringToLocalDate(String yyyy) throws Exception{
		if(SmartUtil.isBlankObject(yyyy) || yyyy.length()!=4) return null;
		DateFormat df = new SimpleDateFormat("yyyy");
		return new LocalDate((df.parse(yyyy)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalTimeStringToLocalDate(String HHmm) throws Exception{
		if(SmartUtil.isBlankObject(HHmm) || HHmm.length()!=5) return null;
		DateFormat df = new SimpleDateFormat("HH:mm");
		return new LocalDate((df.parse(HHmm)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalTimeStringToLocalDate2(String HHmmss) throws Exception{
		if(SmartUtil.isBlankObject(HHmmss) || HHmmss.length()!=8) return null;
		DateFormat df = new SimpleDateFormat("HH:mm:ss");
		return new LocalDate((df.parse(HHmmss)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertGMTStringToLocalDate(String yyyyMMddHHmmssSSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSSS) || yyyyMMddHHmmssSSS.length() < 21) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		return new LocalDate((df.parse(yyyyMMddHHmmssSSS)).getTime() + TimeZone.getDefault().getRawOffset());
	}

	public static LocalDate convertGMTStringToLocalDate2(String yyyyMMddHHmmssSSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSSS) || yyyyMMddHHmmssSSS.length() < 21) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		return new LocalDate((df.parse(yyyyMMddHHmmssSSS)).getTime());
	}

	public static LocalDate convertGMTStringToLocalDate3(String yyyyMMddHHmmssS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssS) || yyyyMMddHHmmssS.length() < 19) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
		return new LocalDate((df.parse(yyyyMMddHHmmssS)).getTime());
	}

	public static Date convertGMTStringToDate(String yyyyMMddHHmmssSSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSSS) || yyyyMMddHHmmssSSS.length() < 21) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		return new Date((df.parse(yyyyMMddHHmmssSSS)).getTime());
	}

	public static LocalDate convertGMTSimpleStringToLocalDate(String yyyyMMdd) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMdd) || yyyyMMdd.length()!=10) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		return new LocalDate((df.parse(yyyyMMdd)).getTime());					
	}
	public static LocalDate convertGMTSimple2StringToLocalDate(String yyyyMMdd) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMdd) || yyyyMMdd.length()!=10) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd");
		return new LocalDate((df.parse(yyyyMMdd)).getTime());					
	}
	public static LocalDate convertGMTDateTimeStringToLocalDate(String yyyyMMddHHmm) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmm) || yyyyMMddHHmm.length()!=16) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd HH:mm");
		return new LocalDate((df.parse(yyyyMMddHHmm)).getTime());					
	}

	public static LocalDate convertGMTTimeStringToLocalDate(String HHmmss) throws Exception{
		if(SmartUtil.isBlankObject(HHmmss) || HHmmss.length()!=8) return null;
		DateFormat df = new SimpleDateFormat("HH:mm:ss");
		return new LocalDate((df.parse(HHmmss)).getTime());
	}

	public static LocalDate convertGMTTimeStringToLocalDate2(String HHmm) throws Exception{
		if(SmartUtil.isBlankObject(HHmm) || HHmm.length()!=5) return null;
		DateFormat df = new SimpleDateFormat("HH:mm");
		return new LocalDate((df.parse(HHmm)).getTime());
	}

	public static LocalDate convertLocalString2ToLocalDate(String yyyyMMddHHmmssSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSS) || yyyyMMddHHmmssSS.length()!=19) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return new LocalDate((df.parse(yyyyMMddHHmmssSS)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertLocalStringTToLocalDate(String yyyyMMddTHHmmss) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddTHHmmss) || yyyyMMddTHHmmss.length()!=17) return null;
		String changed = yyyyMMddTHHmmss.replace("T", " ");
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HHmmss");
		return new LocalDate((df.parse(changed)).getTime() - TimeZone.getDefault().getRawOffset());					
	}

	public static LocalDate convertGMTString2ToLocalDate(String yyyyMMddHHmmssSS) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmmssSS) || yyyyMMddHHmmssSS.length()!=19) return null;
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return new LocalDate((df.parse(yyyyMMddHHmmssSS)).getTime());					
	}

	public static LocalDate convertStringToLocalDate(String yyyyMMddHHmm) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMMddHHmm) || yyyyMMddHHmm.length()!=16) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM.dd HH:mm");
		return new LocalDate((df.parse(yyyyMMddHHmm)).getTime() - TimeZone.getDefault().getRawOffset());
	}

	public static LocalDate convertLocalMonthStringToLocalDate(String yyyyMM) throws Exception{
		if(SmartUtil.isBlankObject(yyyyMM) || (yyyyMM.length()!=7 && yyyyMM.length()!=10)) return null;
		DateFormat df = new SimpleDateFormat("yyyy.MM");
		if(yyyyMM.length() == 10) df = new SimpleDateFormat("yyyy.MM.dd"); 
		return new LocalDate((df.parse(yyyyMM)).getTime() - TimeZone.getDefault().getRawOffset());
	}

	public static LocalDate convertLocalMonthWithDiffMonth(LocalDate localDate, int diffMonth) throws Exception{
		int toMonth = localDate.getMonth() + diffMonth;
		int toYear = localDate.getYear();
		while(toMonth < 0 || toMonth > 11){
			if(toMonth < 0){
				toYear--;
				toMonth = toMonth+12;
			}else{
				toYear++;
				toMonth = toMonth-12;
			}
		}
		return convertLocalMonthStringToLocalDate(String.format("%04d", toYear) + "." + String.format("%02d", toMonth+1));
	}
	
	public static LocalDate convertLocalDateWithDiffMonth(LocalDate localDate, int diffMonth) throws Exception{
		if(localDate==null) return null;
		String ddhhmm = localDate.toLocalDateTimeSimpleString().substring(8, 16);
		int toMonth = localDate.getMonth() + diffMonth;
		int toYear = localDate.getYear();
		while(toMonth < 0 || toMonth > 11){
			if(toMonth < 0){
				toYear--;
				toMonth = toMonth+12;
			}else{
				toYear++;
				toMonth = toMonth-12;
			}
		}
		try{
			LocalDate toLocalDate = convertLocalDateTimeStringToLocalDate(String.format("%04d", toYear) + "." + String.format("%02d", toMonth+1) + "." + ddhhmm);
			return toLocalDate;
		}catch (Exception e){
		}
		return null;
	}

	public static LocalDate convertLocalDateWithDiffMonth(LocalDate localDate, int diffMonth, int weekOfMonth, int dayOfWeek) throws Exception{
		if(localDate==null) return null;
		String hhmm = localDate.toLocalDateTimeSimpleString().substring(11, 16);
		int toMonth = localDate.getMonth() + diffMonth;
		int toYear = localDate.getYear();
		while(toMonth < 0 || toMonth > 11){
			if(toMonth < 0){
				toYear--;
				toMonth = toMonth+12;
			}else{
				toYear++;
				toMonth = toMonth-12;
			}
		}
		
		LocalDate toLocalMonth = convertLocalMonthStringToLocalDate(String.format("%04d", toYear) + "." + String.format("%02d", toMonth+1));
		
		int toDate = 0;
		boolean isLastWeek = false;
		int dayDiff =  (dayOfWeek+1) - toLocalMonth.getDayOfWeek();
		if(weekOfMonth<=10){
			if(weekOfMonth==6){
				weekOfMonth = toLocalMonth.getWeeksOfMonth(1);
				isLastWeek = true;
			}
			if(dayOfWeek+1<toLocalMonth.firstDayOfWeek && toLocalMonth.firstDayOfWeek <= toLocalMonth.getDayOfWeek()){
				dayDiff = dayDiff+7;
			}
			toDate = (weekOfMonth - toLocalMonth.getWeekOfMonth(1))*7 + dayDiff;
		}else{
			weekOfMonth = weekOfMonth-10;
			if(weekOfMonth==6){
				weekOfMonth = toLocalMonth.getWeeksOfMonth(1);
				isLastWeek = true;
			}
			toDate = (weekOfMonth - toLocalMonth.getWeekOfMonth(1))*7 + (dayDiff<0 ? 7+dayDiff : dayDiff);
			if(isLastWeek && toDate+1>toLocalMonth.getDaysOfMonth()) toDate = toDate-7;
		}
		try{
			LocalDate toLocalDate = convertLocalDateTimeStringToLocalDate(String.format("%04d", toYear) + "." + String.format("%02d", toMonth+1) + "." +  String.format("%02d", toDate+1) + " " + hhmm);
			return toLocalDate;
		}catch (Exception e){
		}
		return null;
	}

	public static LocalDate getLocalDateFromLocalDateString(String localDateString){
		if(SmartUtil.isBlankObject(localDateString)) return null;
		DateFormat df = new SimpleDateFormat("EEE, dd MMM, yyyy HH:mm:ss",Locale.ENGLISH);
		try{
			return new LocalDate((df.parse(localDateString)).getTime() - TimeZone.getDefault().getRawOffset());
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	public static long convertStringToTime(String yyyyMMddHHmm) throws Exception{
		return convertStringToDate(yyyyMMddHHmm).getTime();					
	}

	public static long convertTimeStringToTime(String HHmm) throws Exception{
		if(SmartUtil.isBlankObject(HHmm) || HHmm.length()!=5) return 0;
		DateFormat df = new SimpleDateFormat("HH:mm");
		return df.parse(HHmm).getTime();					
	}

	private boolean isToday(){
		if((new LocalDate()).toLocalDateSimple2String().equals(this.toLocalDateSimple2String()))
//		if(getLocalDateOnly(this).getTime() == getLocalDateOnly(new LocalDate()).getTime())
			return true;
		return false;
	}

	private boolean isThisYear(){
		if(getLocalYearOnly(this).getTime() == getLocalYearOnly(new LocalDate()).getTime())
			return true;
		return false;
	}

	public static LocalDate getLocalDateOnly(LocalDate localDate){
		LocalDate lDate = null;
		try{
			lDate =  LocalDate.convertLocalDateStringToLocalDate(localDate.toLocalDateSimpleString());
		}catch (Exception e){
		}
		return lDate;
	}

	public static int getLocalHourOnly(LocalDate localDate){
		LocalDate localDateOnly = LocalDate.getLocalDateOnly(localDate);
		if(localDate == null || localDateOnly == null) return 0;
		return  (int)(localDate.getTime() - localDateOnly.getTime()); 
	}

	public static  LocalDate getLocalYearOnly(LocalDate localDate){
		LocalDate lDate = null;
		try{
			lDate =  LocalDate.convertLocalYearStringToLocalDate(localDate.toLocalYearString());
		}catch (Exception e){
		}
		return lDate;

	}

	public static LocalDate getThisYearDate(LocalDate pastDate){
		if(SmartUtil.isBlankObject(pastDate)) return null;
		
		LocalDate today = new LocalDate();
		
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, today.getYear());
		cal.set(Calendar.MONTH, pastDate.getMonth()+1);
		cal.set(Calendar.DAY_OF_MONTH, pastDate.getDaysOfMonth());
		
		return new LocalDate(cal.getTimeInMillis());
	}
	
	public static LocalDate getThisBirthday(LocalDate birthday){
		return getThisYearDate(birthday);
	}
	
	public static LocalDate getThisLunarBirthday(LocalDate lunarBirthday){
		if(SmartUtil.isBlankObject(lunarBirthday)) return null;
		return convertFromLunar(getThisBirthday(lunarBirthday));
	}
	
	public static LocalDate convertFromLunar(LocalDate localDate){
		if(SmartUtil.isBlankObject(localDate)) return null;
		return convertFromLunarGMTString(localDate.toGMTSimpleDateString3());
	}
	
	public static LocalDate convertToLunar(LocalDate localDate){
		if(SmartUtil.isBlankObject(localDate)) return null;
		return convertGMTStringToLunar(localDate.toGMTSimpleDateString3());
	}
	
	public static String getNow() throws Exception {
		return (new LocalDate()).toGMTDateString();
	}

	public static String getTodayStart() throws Exception{
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();
		String today = new SimpleDateFormat("yyyyMMdd").format(date);
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(today).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}
	
	public static String getTomorrowStart() throws Exception{
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();
		String tomorrow = new SimpleDateFormat("yyyyMMdd").format(new Date(date.getTime() + LocalDate.ONE_DAY));
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(tomorrow).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}
	
	public static String getRecentDays() throws Exception {
		return LocalDate.getRecentSomeDays(7);
	}

	public static String getRecentSomeDays(int someDays) throws Exception {
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();
		String recentSomeDays = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date(date.getTime() - (someDays)*LocalDate.ONE_DAY));
		try {
			return LocalDate.convertLocalString2ToLocalDate(recentSomeDays).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getThisMonthStart() throws Exception {
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();
		String thisMonth = new SimpleDateFormat("yyyyMMdd").format(date);
		thisMonth = thisMonth.substring(0, 6) + "01" ;
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(thisMonth).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}
	
	public static String getNextMonthStart() throws Exception {
		Calendar cal = Calendar.getInstance();
		java.util.Date date = cal.getTime();
		String thisMonth = new SimpleDateFormat("yyyyMMdd").format(date);
		thisMonth = thisMonth.substring(0, 6) + "01" ;
		try {
			LocalDate thisMonthStart = LocalDate.convertLocalDateStringToLocalDate1(thisMonth);
			return new LocalDate(thisMonthStart.getTime() + thisMonthStart.getDaysOfMonth()*LocalDate.ONE_DAY).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}
	
	public static String getRecentSomeMonths(int someMonths) throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisMonth = new LocalDate().getMonth();
		calendar.set(Calendar.MONTH, thisMonth - someMonths);
		String recentMonth = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(calendar.getTime());
		try {
			return LocalDate.convertLocalString2ToLocalDate(recentMonth).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getThisWeekStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisDayOfWeek = (new LocalDate()).getFirstDayOfWeek();
		calendar.set(Calendar.DAY_OF_WEEK, thisDayOfWeek);
		String thisWeekStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(thisWeekStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getNextWeekStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisDayOfWeek = (new LocalDate()).getFirstDayOfWeek();
		calendar.set(Calendar.DAY_OF_WEEK, thisDayOfWeek);
		String nextWeekStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			LocalDate thisWeekStart = LocalDate.convertLocalDateStringToLocalDate1(nextWeekStart);
			return new LocalDate(thisWeekStart.getTime() + LocalDate.ONE_DAY*7).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getThisYearStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisYear = new LocalDate().getYear();
		calendar.set(Calendar.YEAR, thisYear);
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		String thisYearStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(thisYearStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getNextYearStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisYear = new LocalDate().getYear();
		calendar.set(Calendar.YEAR, thisYear);
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		String thisYearStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return new LocalDate(LocalDate.convertLocalDateStringToLocalDate1(thisYearStart).getTime() + LocalDate.ONE_YEAR).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getThisQuarterStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisMonth = new LocalDate().getMonth();
		int thisQuarter = thisMonth / 3;
		if(thisQuarter == 0)
			thisMonth = 0;
		else if(thisQuarter == 1)
			thisMonth = 3;
		else if(thisQuarter == 2)
			thisMonth = 6;
		else if(thisQuarter == 3)
			thisMonth = 9;

		calendar.set(Calendar.MONTH, thisMonth);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		String thisQuarterStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(thisQuarterStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getNextQuarterStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisYear = new LocalDate().getYear();
		int thisMonth = new LocalDate().getMonth();
		int thisQuarter = thisMonth / 3;
		if(thisQuarter == 0)
			thisMonth = 0;
		else if(thisQuarter == 1)
			thisMonth = 3;
		else if(thisQuarter == 2)
			thisMonth = 6;
		else if(thisQuarter == 3)
			thisMonth = 9;

		if(thisQuarter < 3){
			calendar.set(Calendar.MONTH, thisMonth+3);
		}else{
			calendar.set(Calendar.YEAR, thisYear+1);
			calendar.set(Calendar.MONTH, 0);
		}
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		String nextQuarterStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(nextQuarterStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}
	}

	public static String getThisHalfYearStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisMonth = new LocalDate().getMonth();
		int thisHalfYear = thisMonth / 6;
		if(thisHalfYear == 0)
			thisMonth = 0;
		else if(thisHalfYear == 1)
			thisMonth = 6;

		calendar.set(Calendar.MONTH, thisMonth);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		String thisHalfYearStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(thisHalfYearStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}

	}
	
	
	public static String getNextHalfYearStart() throws Exception {
		Calendar calendar = Calendar.getInstance();
		int thisYear = new LocalDate().getYear();
		int thisMonth = new LocalDate().getMonth();
		int thisHalfYear = thisMonth / 6;
		if(thisHalfYear == 0)
			thisMonth = 0;
		else if(thisHalfYear == 1)
			thisMonth = 6;

		if(thisHalfYear == 0){
			calendar.set(Calendar.MONTH, thisMonth+6);
		}else{
			calendar.set(Calendar.YEAR, thisYear+1);
			calendar.set(Calendar.MONTH, 0);
		}
		calendar.set(Calendar.DAY_OF_MONTH, 1);

		String nextHalfYearStart = new SimpleDateFormat("yyyyMMdd").format(calendar.getTime());
		try {
			return LocalDate.convertLocalDateStringToLocalDate1(nextHalfYearStart).toGMTDateString();
		} catch (ParseException e) {
			throw new Exception(e);
		}

	}
	
	
	private static LocalDate convertFromLunarGMTString(String yyyymmdd){
		if(SmartUtil.isBlankObject(yyyymmdd)) return null;
		String date = yyyymmdd.trim();
		
		if(date.length() != 8){
			if(date.length() == 4)
				date = date + "0101";
			else if(date.length() == 6)
				date = date + "01";
			else if(date.length()>8)
				date = date.substring(0, 8);
			else
				return null;
		}
		
		Calendar cal = Calendar.getInstance();
		ChineseCalendar cc = new ChineseCalendar();
		cc.set(ChineseCalendar.EXTENDED_YEAR, Integer.parseInt(date.substring(0,4)) +2637);
		cc.set(ChineseCalendar.MONTH, Integer.parseInt(date.substring(4,6))-1);
		cc.set(ChineseCalendar.DAY_OF_MONTH, Integer.parseInt(date.substring(6)));
		
		cal.setTimeInMillis(cc.getTimeInMillis());
		
		return new LocalDate(cal.getTimeInMillis());
	}

	private static LocalDate convertGMTStringToLunar(String yyyymmdd){
		if(SmartUtil.isBlankObject(yyyymmdd)) return null;
		String date = yyyymmdd.trim();
		
		if(date.length() != 8){
			if(date.length() == 4)
				date = date + "0101";
			else if(date.length() == 6)
				date = date + "01";
			else if(date.length()>8)
				date = date.substring(0, 8);
			else
				return null;
		}
		
		Calendar cal = Calendar.getInstance();
		ChineseCalendar cc = new ChineseCalendar();
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0,4)));
		cal.set(Calendar.MONTH, Integer.parseInt(date.substring(4,6))-1);
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(6)));
		
		cc.setTimeInMillis(cal.getTimeInMillis());
		
		return new LocalDate(cc.getTimeInMillis());
	}	
}
