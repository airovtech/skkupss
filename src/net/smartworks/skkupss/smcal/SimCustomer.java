package net.smartworks.skkupss.smcal;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SimCustomer{
    
	private String[] valuesS=null;
	private String[] valuesT=null;
	
	public SimCustomer(String[] valuesS, String[] valuesT){
		this.valuesS = valuesS;
		this.valuesT = valuesT;
	}
	
	public String[] getValuesS() {
		return valuesS;
	}
	public void setValuesS(String[] valuesS) {
		this.valuesS = valuesS;
	}
	public String[] getValuesT() {
		return valuesT;
	}
	public void setValuesT(String[] valuesT) {
		this.valuesT = valuesT;
	}
	
	public Customer getCustomerS(){
		return getCustomer(this.valuesS);
	}
	public Customer getCustomerT(){
		return getCustomer(this.valuesT);
	}
	
	public Customer getCustomer(String[] values){
		Customer customer = new Customer();
		if(values==null) return customer;
		for(int i=0; i<values.length; i++){
			String value = values[i];
			if(value.length()!=8) continue;
			customer.addActivity(Integer.parseInt(value.substring(2, 4)), Integer.parseInt(value.substring(4,6)), "");
		}
		return customer;
	}
	public double calculateSimularity(){
		Customer cusA = this.getCustomerS();
		Customer cusB = this.getCustomerT();


		float num_sum = 0;
		float sim_sum = 0;
		float result = 0;

		num_sum = cusA.getSize()*cusB.getSize();
		
		for(int i=0; i < cusA.getSize(); i++){
			for(int j=0; j < cusB.getSize(); j++){
				double adder = 0;
				if(cusA.firstCat.get(i) == cusB.firstCat.get(j)){
					if(cusA.secondCat.get(i) != cusB.secondCat.get(j)){
						switch ( cusA.firstCat.get(i) ){
							case 1: 
								adder = 0.9542;
								break;
							case 2:
								adder = 0.6532;
								break;
							case 3:
								adder = 0.4771;
								break;
							case 4:
								adder = 0.4771;
								break;
							}
					}
					else if(cusA.secondCat.get(i) == cusB.secondCat.get(j)){
						adder = 0.9542;
					}
				}
				sim_sum += adder;
			}			
		}

		result = sim_sum/num_sum;
		
		/*
		 * if two customer is exactly same
		 * (data & input order are all same)
		 * **/
		if(cusA.getSize()==cusB.getSize()){
			int tmp = 0;
			for(int i = 0; i < cusA.getSize(); i++){
				if((cusA.thirdName.get(i)==cusB.thirdName.get(i))
						&&(cusA.secondCat.get(i)==cusB.secondCat.get(i))
						&&(cusA.firstCat.get(i)==cusB.firstCat.get(i))){
					tmp += 1;
				}else{
					break;
				}				
			}
			result = (tmp==cusA.getSize())? 1:result;
		}
				
		return result;
    }

}



class Customer {
	private int tot_numofacts;
	private int[] numofacts = new int[9];
	private String[] keyacts;
	
	List<Integer> firstCat = new ArrayList<Integer>();
	List<Integer> secondCat = new ArrayList<Integer>();
	List<String> thirdName = new ArrayList<String>();

	Customer() {
		
		numofacts = new int[] {0,0,0,0,0,0,0,0,0};
		tot_numofacts = 0;
		
	}
	
	Customer(int[] num, String[] key) {
		numofacts = num;
		keyacts = key;

		for (int i = 0; i < 9; i++) {
			tot_numofacts += numofacts[i];
		}
	}
	
	Customer(String str_num, String str_name){
		
		String[] num = str_num.split(",");
		String[] name = str_name.split(",");
		
		
		for (int i = 0 ; i< 9; i++){
			numofacts[i] = Integer.valueOf(num[i]);
			tot_numofacts += numofacts[i];
		}
		keyacts = name.clone();
	}

	Customer(boolean rnd, String[] candidates) {
		List<String> keyacts_list = new ArrayList<String>();

		for (int i = 0; i < 9; i++) {
			numofacts[i] = (int) (Math.random() * 3);
			tot_numofacts += numofacts[i];

			for (int j = 0; j < numofacts[i]; j++) {
				keyacts_list.add(candidates[(int) (Math.random() * candidates.length)]);
			}
		}
		keyacts_list.add("0");
		keyacts = new String[keyacts_list.size()];
		keyacts = keyacts_list.toArray(keyacts);

	}
	
	void addActivity(int first4, int second9, String name){
		firstCat.add(first4);
		secondCat.add(second9);
		thirdName.add(name);
		
		
	}
	
	int getSize(){
		return firstCat.size();
	}
	
	int[] getNumofActs(){
		return numofacts;
	}
	int getTotofActs(){
		return tot_numofacts;
	}
	

	void print(int i) {

		System.out.println("ID: " + Integer.toString(i));
		System.out.println(Integer.toString(numofacts[0]) + Integer.toString(numofacts[1])
				+ Integer.toString(numofacts[2]) + Integer.toString(numofacts[3]) + Integer.toString(numofacts[4])
				+ Integer.toString(numofacts[5]) + Integer.toString(numofacts[6]) + Integer.toString(numofacts[7])
				+ Integer.toString(numofacts[8]) );
		System.out.println(Arrays.asList(keyacts));
		// System.out.println(numofacts.toString());
		// System.out.println(keyacts.toString());

	}

	void write(int i, PrintWriter writer) {

		writer.println("ID: " + Integer.toString(i));
		writer.println(Integer.toString(numofacts[0]) + Integer.toString(numofacts[1])
				+ Integer.toString(numofacts[2]) + Integer.toString(numofacts[3]) + Integer.toString(numofacts[4])
				+ Integer.toString(numofacts[5]) + Integer.toString(numofacts[6]) + Integer.toString(numofacts[7])
				+ Integer.toString(numofacts[8]));
		writer.println(Arrays.asList(keyacts));
		// System.out.println(numofacts.toString());
		// System.out.println(keyacts.toString());

	}

}
