import { GoogleAuthGuard } from './google-auth.guard';

describe('GoogleAuthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleAuthGuard()).toBeDefined();
  });
});
