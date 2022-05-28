using advanced_programming_2_backend.Data;
using advanced_programming_2_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace advanced_programming_2_backend.Services
{

        public interface IRatings
        {
        public Task<List<Rating>?> getAllRatings();
        public Task<Rating?> getOneRating(int? id);
        public Task<Rating?> Add(Rating rating);
        public Task<Rating?> Update(Rating rating);
        public bool IsRatingsNull();
        public Task<Rating?> FindRating(int? id);
        public Task<Rating?> DeleteRating(int id);
        public bool RatingExists(int id);
        }
    public class RatingsService : IRatings
        {
        private readonly advanced_programming_2_backendContext _context;
        public RatingsService(advanced_programming_2_backendContext context)
        {
            _context = context;
        }

        public async Task<List<Rating>?> getAllRatings()
        {
            if(_context.Rating == null)
            {
                return null;
            }
            return await _context.Rating.ToListAsync();
        }
        public async Task<Rating?> getOneRating(int? id)
        {
            if (id == null || _context.Rating == null)
            {
                return null;
            }
            return await _context.Rating
                .FirstOrDefaultAsync(m => m.Id == id);
        }
        public async Task<Rating?> Add(Rating rating)
        {
            _context.Add(rating);
            await _context.SaveChangesAsync();
            return rating;
        }
        public async Task<Rating?> Update(Rating rating)
        {

            try
            {
                _context.Update(rating);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(rating.Id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            return rating;
        }
        public bool IsRatingsNull()
        {
            if (_context.Rating == null)
            {
                return true;
            }
            return false;
        }
        public async Task<Rating?> FindRating(int? id)
        {
            if (id == null || _context.Rating == null)
            {
                return null;
            }
            return await _context.Rating.FindAsync(id);
        }
        public async Task<Rating?> DeleteRating(int id)
        {
            var rating = await FindRating(id);
            if(rating == null || _context.Rating == null)
            {
                return null;
            }
            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();
            return rating;
        }
        public bool RatingExists(int id)
        {
            return (_context.Rating?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }



}


