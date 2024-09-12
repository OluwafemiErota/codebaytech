// Add event listener to the copy button
document.getElementById("copyButton").addEventListener("click", function () {
  const referenceId = document.getElementById("referenceId").innerText;

  // Copy the reference ID to the clipboard
  navigator.clipboard
    .writeText(referenceId)
    .then(function () {
      // Show success message
      const copyStatus = document.getElementById("copyStatus");
      copyStatus.innerText = "Reference ID copied!";

      // Clear the message after 2 seconds
      setTimeout(() => {
        copyStatus.innerText = "";
      }, 2000);
    })
    .catch(function (error) {
      console.error("Failed to copy text: ", error);
    });
});
