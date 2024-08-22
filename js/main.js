let user = [
    {
        id: "001",
        login: "MDK91",
        password: "123456",
        userName: "Ibrohim"
    }
];

let payArray = [];

$("#editBtn").click(function(){
    let id = $(this).attr("id");
    payArray.forEach(function(item,i){
        if(id == item.id){
            payArray[i].payUser = $("#payEditUser").val();
            payArray[i].payUserId = $("#payEditUserId").val();
            payArray[i].payOrder = $("#payEditOrder").val();
            payArray[i].paySum = $("#payEditSum").val();
            payArray[i].payTarget = $("#payEditTarget").val();
            payArray[i].payType = $("#payEditType").val();
            payArray[i].payDate = $("#payEditDate").val();
        }
    });
    $("#editModal").modal("hide");
    draw();
});

function remove (id){
    payArray.forEach(function(a,b){
        if(id == a.id){
            payArray.splice(b,1);
        }
    });
    draw();
}

function edit(id){
    payArray.forEach(function(item){
        if(id == item.id){
            $("#payEditUser").val(item.payUser);
            $("#payEditUserId").val(item.payUserId);
            $("#payEditOrder").val(item.payOrder);
            $("#payEditSum").val(item.paySum);
            $("#payEditTarget").val(item.payTarget);
            $("#payEditType").val(item.payType);
            $("#payEditDate").val(item.payDate);
            $("#editBtn").attr("id",item.id);
        }
    });
}

function draw(){
    let list = ''
        payArray.forEach(function(item){
            list += '<tr>'+
                        '<td>'+ item.id +'</td>'+
                        '<td>'+ item.payUser +'</td>'+
                        '<td>'+ item.paySum +'</td>'+
                        '<td>'+ item.payOrder +'</td>'+
                        '<td><span class="badge badge-success">'+ item.payTarget +'</span></td>'+
                        '<td>'+ item.payDate +'</td>'+
                        '<td>'+
                        '    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onclick="edit('+ item.id +')">Edit</button>'+
                        '    <button type="button" class="btn btn-danger" onclick="remove('+ item.id +')">Delete</button>'+
                        '</td>'+
                    '</tr>'
        });
        $("#tbody").html(list);
}

$(document).ready(function(){
    let kirishSoni = 0;
    let payId = 0;
    let ManagerId = '';
    $("#startModal").modal("show");
    $("#startBtn").click(function(){
        let login = $("#login").val();
        let password =$("#password").val();
        if(login !="" && password !=""){
            let result = false;
            user.forEach(function(item){
                if(login == item.login){
                    if(password == item.password){
                        $("#workingBlock").toggleClass("d-none");
                        $("#manager").html(item.userName);
                        $("#startModal").modal("hide");
                        result = true;
                        ManagerId = item.id;
                    }
                }
            })
            if(!result){
                if(kirishSoni >= 2){
                    $("#startModal").modal("hide");
                    alert("Tizim bloklandi!");
                }
                alert("login yoki parol xato!");
                kirishSoni++;
            }
        }
        else{
            alert("login va parol qatorini toldiring!")
        }
    });
    $("#addPay").click(function(){
        let payUser = $("#payUser").val();
        let payUserId = $("#payUserId").val();
        let payOrder = $("#payOrder").val();
        let paySum = $("#paySum").val();
        let payType = $("#payType").val();
        let payTarget = $("#payTarget").val();
        let payDate = $("#payDate").val();
        payId++;
        payArray.push(
            {
                id: payId,
                userId: ManagerId,
                payUser: payUser,
                payUserId: payUserId,
                payOrder: payOrder,
                paySum: paySum,
                payType: payType,
                payTarget: payTarget,
                payDate: payDate
            }
        );
        draw();
    });
   
});

