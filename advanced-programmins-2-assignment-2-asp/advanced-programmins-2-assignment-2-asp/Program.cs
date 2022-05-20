using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using advanced_programmins_2_assignment_2_asp.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<advanced_programmins_2_assignment_2_aspContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("advanced_programmins_2_assignment_2_aspContext") ?? throw new InvalidOperationException("Connection string 'advanced_programmins_2_assignment_2_aspContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    // pattern: "{controller=Home}/{action=Index}/{id?}");
    pattern: "{controller=Ratings}/{action=Index}/{id?}");

app.Run();
