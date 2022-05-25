class EmployeePayrollData{
    get id(){return this.id;}
    set id(id){this.id = id;}

    get name(){return this.name;}
    set name(newName){
        let nameRegex = RegExp(/^[A-Z]{1}[a-zA-Z\\s]{2,}/);
        if(nameRegex.test(newName)){
            this.name = newName;
        }
        else throw 'Name is Incorrect!';
    }

    get profilePic(){return this.profilePic;}
    set profilePic(profilePic){this.profilePic = profilePic;}


    get gender(){return this.gender;}
    set gender(gender){this.gender = gender;}

    get department(){return this.department;}
    set department(department){this.department = department;}

    get salary(){return this.salary;}
    set salary(salary){this.salary = salary;}

    get note(){return this.note;}
    set note(note){this.note = note;}

    get startDate(){return this.startDate;}
    set startDate(startDate){this.startDate = startDate;}


    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empData = !this.startDate ? "undefined" : 
                        this.startDate.toLocalDateString("en-US",option);
        return "id ="+this.id+" name ="+this.name+" gender ="+this.gender+"profilePic ="+this.profilePic+"salary ="+this.salary+
        " department ="+this.department+" note ="+this.note+" start date ="+this.startDate ;
    }
}


window.addEventListener('DOMContentLoaded',(event)=>{
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error')
    // let employeePayrollData = new EmployeePayrollData();
    name.addEventListener('input',function () {
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";

        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const salaryError = document.querySelector('.salary-output')
    salaryError.textContent = salary.value;
    salary.addEventListener('input',function () {
        salaryError.textContent = salary.value;
    });
})

const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStoreage(employeePayrollData);
    } catch (error) {
        
    }
}

// Local storage
function createAndUpdateStoreage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollData!= undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList  = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () =>{
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');

    } catch (e) {
        setTextValue('.text-error',e);
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#note');
    let date = getInputValueById('#day')+""+getInputValueById('#month')+""+getInputValueById('#year');
    employeePayrollData.date = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue)=>{
    let allItems = document.querySelector(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value)
    });
    return setItems;
}

const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) =>{
    let value = document.getElementById(id).value;
    return value;
}

//reset form
const resetForm = ()=>{
    setValue('#name','');
    unsetSelectedValue('[name = profile]');
    unsetSelectedValue('[name = gender]');
    unsetSelectedValue('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2022');
}

const setValue = (id , value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const unsetSelectedValue = (propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}

const setTextValue = (id , value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

