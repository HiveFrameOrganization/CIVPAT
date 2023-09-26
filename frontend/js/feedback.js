export default function alertas () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      if(localStorage.getItem('status')){
        const status = localStorage.getItem('status');
        const mensagem = localStorage.getItem('mensagem');

        setTimeout(removerLocalStorage, 1000);
        
        Toast.fire({
            icon: status,
            title: mensagem
          })


      }
    
} 



function removerLocalStorage(){
  
  localStorage.removeItem('status');
  localStorage.removeItem('mensagem');
}
