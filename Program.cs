using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using advanced_programming_2_backend.Data;
using advanced_programming_2_backend.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<advanced_programming_2_backendContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("advanced_programming_2_backendContext") ?? throw new InvalidOperationException("Connection string 'advanced_programming_2_backendContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IRatings, RatingsService>();

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
    pattern: "{controller=Ratings}/{action=Index}/{id?}");

app.Run();
