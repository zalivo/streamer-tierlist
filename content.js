const TIER_COLORS = {
    'S': '#ff7f7f',  
    'A': '#ffbf7f',  
    'B': '#ffdf7f', 
    'C': '#ffff7f', 
    'D': '#bfff7f',
    'E': '#7fff7f',
    'F': '#7fffff',
    'G': '#7fbfff',
    'H': '#7f7fff',
    'N': '#ff7fff',
};

function addTierDisplay() {
    const streamerName = document.title.split(' - ')[0];

    const jsonUrl = 'https://raw.githubusercontent.com/zalivo/streamer-tierlist/main/streamers.json'

     fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const streamer = data.streamers.find(s => 
                s.name.toLowerCase() === streamerName.toLowerCase()
            );

            if (streamer) {
                const tierDiv = document.createElement('div');
                tierDiv.id = 'streamer-tier';
                tierDiv.textContent = `${streamer.tier}`;

                const backgroundColor = TIER_COLORS[streamer.tier] || "#9147ff"
                
                tierDiv.style.cssText = `
                    display: inline-block;
                    background-color: ${backgroundColor};
                    color: white;
                    padding: 2px 8px;
                    border-radius: 4px;
                    margin-left: 8px;
                    font-weight: bold;
                    font-size: 14px;
                `;

                const waitForHeader = setInterval(() => {
                    const headerRight = document.querySelector('[data-target="channel-header-right"]');
                    if (headerRight) {
                        clearInterval(waitForHeader);
                        if (!document.getElementById('streamer-tier')) {
                            headerRight.insertBefore(tierDiv, headerRight.firstChild);
                        }
                    }
                }, 1000);
            }
        });
}


addTierDisplay();

const observer = new MutationObserver(() => {
    addTierDisplay();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});