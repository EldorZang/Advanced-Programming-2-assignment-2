using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using advanced_programming_2_backend.Data;
using advanced_programming_2_backend.Models;
using advanced_programming_2_backend.Services;

namespace advanced_programming_2_backend.Controllers
{
    public class RatingsController : Controller
    {
        private readonly IRatings service;

        public RatingsController(IRatings serviceArg)
        {
            service = serviceArg;
        }
        // GET: Ratings
        public async Task<IActionResult> Index()
        {
            var ratings = await service.getAllRatings();
              return ratings != null ? 
                          View(ratings) :
                          Problem("DB.Rating is null.");
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            var allRatings = await service.getAllRatings();
            if (id == null || allRatings == null)
            {
                return NotFound();
            }

            var raiting = await service.getOneRating(id);
            if (raiting == null)
            {
                return NotFound();
            }

            return View(raiting);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Score,Name,Description")] Rating rating)
        {
            rating.Date = DateTime.Now;
            if (ModelState.IsValid)
            {
                await service.Add(rating);
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || service.IsRatingsNull())
            {
                return NotFound();
            }

            var rating = await service.FindRating(id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Score,Name,Date,Description")] Rating rating)
        {
            rating.Date = DateTime.Now;
            if (id != rating.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                if (await service.Update(rating) == null)
                {
                    return NotFound();
                }
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || service.IsRatingsNull())
            {
                return NotFound();
            }
            var rating = await service.getOneRating(id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (service.IsRatingsNull())
            {
                return Problem("DB.Rating is null.");
            }
            var rating = await service.DeleteRating(id);
            if (rating == null)
            {
                return NotFound();
            }
            return RedirectToAction(nameof(Index));
        }


    }
}
