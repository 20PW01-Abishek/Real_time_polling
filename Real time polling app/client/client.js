if(document.cookie=="flag=1")
{
    const l = document.querySelectorAll(".myBtn");
    for (let i = 0; i < l.length; i++) {
        l[i].disabled = true;
    }

    let canvas = document.getElementById("voteChart");
    canvas.style.display = "block";
}        

const ctx = document.getElementById("voteChart").getContext("2d");

const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Candidates"],
    },
    options: {

    }
});

const socket = io("localhost:80");

socket.on("update", (candidates) => {

    candidates = Object.entries(candidates);
    
    for (const [key, candidate] of candidates) {

        if (typeof chart.data.datasets[key] == "undefined" && chart.data.datasets.length < candidates.length) {
            chart.data.datasets.push({
                backgroundColor: candidate.color,
                borderColor: candidate.color,
                data: [candidate.votes],
                label: candidate.label,
                options: {
                    scales: {
                        y: {
                            min:0,
                            beginAtZero : true,
                        }
                    }
                }
            });
        } else if (typeof chart.data.datasets[key] != "undefined") {
            chart.data.datasets[key].data = [candidate.votes];
        }

    }

    chart.update();
});


function vote(index) {
    socket.emit("vote", index);

    const l = document.querySelectorAll(".myBtn");
    for (let i = 0; i < l.length; i++) {
        l[i].disabled = true;
    }

    let canvas = document.getElementById("voteChart");
    canvas.style.display = "block";
}
document.cookie="flag=1; expires=Mon, 13 Mar 2023 00:00:00 UTC; path=/;";