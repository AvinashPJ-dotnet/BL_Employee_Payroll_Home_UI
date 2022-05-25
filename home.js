window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
});

const createInnerHtml = ()=>{
    const headerTable = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Action</th></tr>";
    let innerHtml =`${headerTable}`;
    let employeeDataList = createEmployeePayrollJSON();
    for(const employeeData of employeeDataList){
        innerHtml =`${innerHtml}
        <tr>
            <td>
                <img class="profile" alt="" src="${employeeData._profilePic}">
            </td>
            <td>${employeeData._name}</td>
            <td>${employeeData._gender}</td>
            <td>${getDeptHtml(employeeData._department)}</div></td>
            <td>${employeeData._salary}</td>
            <td>${employeeData._startDate}</td>
            <td>
                <img name="${employeeData._id}" onclick="remove(this)" alt="delete" src="assets\\icons\\delete-black-18dp.svg">
                <img name="${employeeData._id}" onclick="update(this)" alt="edit" src="assets\\icons\\create-black-18dp.svg">
            </td>
        </tr>
        `;
        
    }
    document.querySelector('#table-display').innerHTML = innerHtml;

}


const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
        _name: "Avinash",
        _gender: 'Male',
        _department:['Engineer','Marketing'],
        _salary:'500000',
        _startDate:'20 Nov 2022',
        _note:'sdfsdfsd',
        _id:new Date().getTime()+1,
        _profilePic:'assets\\profile-images\\Ellipse -3.png'
    },
    {
        _name: "Anand",
        _gender: 'Male',
        _department:['Engineer'],
        _salary:'500000',
        _startDate:'20 Nov 2022',
        _note:'sdfsdfsdf',
        _id:new Date().getTime()+1,
        _profilePic:'assets\\profile-images\\Ellipse -7.png'
    },
    {
        _name: "Vineet",
        _gender: 'Male',
        _department:['HR'],
        _salary:'500000',
        _startDate:'20 Nov 2022',
        _note:'sdfsdfsd',
        _id:new Date().getTime()+1,
        _profilePic:'assets\\profile-images\\Ellipse -5.png'
    },
    {
        _name: "Rajesh",
        _gender: 'Male',
        _department:['Marketing'],
        _salary:'500000',
        _startDate:'23 Nov 2022',
        _note:'dssdfdfds',
        _id:new Date().getTime()+1,
        _profilePic:'assets\\profile-images\\Ellipse -8.png'
    }

    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList)=>{
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}