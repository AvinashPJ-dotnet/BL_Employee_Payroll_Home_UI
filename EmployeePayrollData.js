class EmployeePayrollData{
    get id(){return this._id;}
    set id(id){this._id = id;}

    get name(){return this._name;}
    set name(newName){
        let nameRegex = RegExp(/^[A-Z]{1}[a-zA-Z\\s]{2,}/);
        if(nameRegex.test(newName)){
            this._name = newName;
        }
        else throw 'Name is Incorrect!';
    }

    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){this._profilePic = profilePic;}


    get gender(){return this._gender;}
    set gender(gender){this._gender = gender;}

    get department(){return this._department;}
    set department(department){this._department = department;}

    get salary(){return this._salary;}
    set salary(salary){this._salary = salary;}

    get note(){return this._note;}
    set note(note){this._note = note;}

    get startDate(){return this._startDate;}
    set startDate(startDate){this._startDate = startDate;}


    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        // const empData = !this._startDate ? "undefined" : this._startDate.toLocalDateString("en-US",option);
        return "id ="+this._id+" name ="+this._name+" gender ="+this._gender+"profilePic ="+this._profilePic+"salary ="+this._salary+
        " department ="+this._department+" note ="+this._note+" start date ="+this._startDate ;
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
        alert(error)
    }
}

// Local storage
function createAndUpdateStoreage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!= undefined){
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
    employeePayrollData.profilePic = getSelectedRadioValues('input[name=profile]:checked');
    employeePayrollData.gender = getSelectedRadioValues('input[name=gender]:checked');
    employeePayrollData.department = getSelectedCheckBoxValues('input[name=department]:checked');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+""+getInputValueById('#month')+""+getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedRadioValues = (propertyValue)=>{
    let selectedItem = document.querySelector(propertyValue).value;
    if(selectedItem != null){
        return selectedItem;
    }
    return null;
}

const getSelectedCheckBoxValues = (propertyValue)=>{
    let selectedItem = document.querySelectorAll(propertyValue);
    let setItems = [];
    if(selectedItem != null){
        selectedItem.forEach(item =>{
            if(item.checked){
                setItems.push(item.value);
            }
        })
    }
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

