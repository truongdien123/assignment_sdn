export const handleDeleteAllProducts = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete all products?"
  );
  if (!confirmed) return;

  try {
    const res = await fetch("/api/product/delete-all", {
      method: "DELETE",
    });

    if (res.ok) {
      alert("All products deleted!");
      // window.location.reload();
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete products.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }
};
