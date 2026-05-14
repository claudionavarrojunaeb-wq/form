(function(){
  const form = document.getElementById('multiStepForm');
  const steps = Array.from(document.querySelectorAll('.step'));
  const progressBar = document.getElementById('progressBar');
  let current = 0;

  function showStep(index){
    steps.forEach((s,i)=>{
      s.classList.toggle('active', i===index);
    });
    // progress: steps.length-1 are real steps (last is summary)
    const total = steps.length - 1;
    const pct = Math.round((index / total) * 100);
    progressBar.style.width = pct + '%';
    current = index;
  }

  // initial
  showStep(0);

  // navigation
  document.getElementById('next1').addEventListener('click', ()=>{
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    if(!name.value.trim()){ alert('Ingrese nombre'); name.focus(); return; }
    if(!email.value.trim()){ alert('Ingrese correo'); email.focus(); return; }
    showStep(1);
  });
  document.getElementById('prev2').addEventListener('click', ()=> showStep(0));
  document.getElementById('next2').addEventListener('click', ()=> showStep(2));
  document.getElementById('prev3').addEventListener('click', ()=> showStep(1));

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const agree = document.getElementById('agree');
    if(!agree.checked){ alert('Debe aceptar los términos'); agree.focus(); return; }
    // show summary
    const summary = document.getElementById('summaryContent');
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      age: document.getElementById('age').value,
      country: document.getElementById('country').value,
      comments: document.getElementById('comments').value
    };
    summary.innerHTML = '<pre>'+JSON.stringify(data,null,2)+'</pre>';
    showStep(3);
  });

  document.getElementById('startOver').addEventListener('click', ()=>{
    form.reset();
    showStep(0);
  });
})();
